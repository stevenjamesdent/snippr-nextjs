import * as CONSTANTS from '@snippr/constants';

import { get_snipper_profiles } from './utils/profiles';
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;

export const _subdomains = {
    apps: Object.keys(CONSTANTS.SETTINGS.URLS.SUBDOMAINS.APPS).map((KEY) => CONSTANTS.SETTINGS.URLS.SUBDOMAINS.APPS[KEY]),
    misc: [
        CONSTANTS.SETTINGS.URLS.SUBDOMAINS.HANDLERS.QR,
    ],
};

const get_subdomain_data = async (host, request_headers) => {
    const headers = new Headers(request_headers);
    const snipper_profiles = await get_snipper_profiles();
    
    let subdomain = null;
    let snipper = false;

    if (!host && typeof window !== 'undefined') {
        host = window.location.host;
    }

    const hostname = host.replace(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');

    if (hostname && hostname.includes('.')) {
        const candidate = host.split('.')[0];

        if (candidate && !candidate.includes('localhost')) {
            subdomain = candidate;
        }
    }

    if (snipper_profiles?.find((slug) => slug === subdomain)) {
        headers.set('snipper-slug', subdomain);
        subdomain = '_snipper';
        snipper = true;
    } else if (!_subdomains?.apps?.includes(subdomain) && !_subdomains?.misc?.includes(subdomain)) {
        subdomain = null;
    }

    return [subdomain, headers, snipper];
};

const should_404 = (url, subdomain) => {
    return (
        url.pathname.startsWith(`/_snipper`) ||
        url.pathname.startsWith(`/app`)
    );
}

const should_redirect = (url, subdomain) => {
    return (
        subdomain === 'qr' && !url.pathname?.length
    );
}

export async function middleware(request) {
    const url = request.nextUrl.clone();

    if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

    const host = request.headers.get('host');
    const [subdomain, headers, is_snipper] = await get_subdomain_data(host, request.headers);

    if (should_404(url, subdomain)) {
        url.pathname = `/404`
    } else if (!should_redirect(url, subdomain) && subdomain && (url.pathname === '/' || !is_snipper)) {
        url.pathname = _subdomains?.apps?.includes(subdomain)
                            ? `/_apps/${subdomain}${url.pathname}`
                            : `/${subdomain}${url.pathname}`;
    } else if (subdomain) {
        return NextResponse.redirect(`https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${url.pathname}`);
    }

    return NextResponse.rewrite(url, {
        request: {
            headers: headers,
        },
    });
}