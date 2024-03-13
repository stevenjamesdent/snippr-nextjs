import * as CONSTANTS from '@snippr/constants';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { isAndroid, isIOS } from 'react-device-detect';

const useAppRedirect = () => {
    const router = useRouter();
    const { query: { path, app, ...params } } = router;

    const snippr_app_scheme = 'snippr.app';
    const snippr_biz_app_scheme = 'snippr.biz.app';

    const [error, set_error] = useState(false);
    const [target, set_target] = useState(null);

    useEffect(() => {
        set_error(false);

        if (app) {
            if (!isAndroid && !isIOS) {
                const scheme = get_link_scheme();
    
                set_target(
                    scheme === snippr_biz_app_scheme
                        ? CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR_BIZ.GENERIC
                        : CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.GENERIC
                );
            } else if (path) {
                const link = parse_app_link();
    
                set_target(link);
                
                if (link) {
                    setTimeout(() => window.location.replace(link), 1500);
                } else {
                    set_error(true);
                }
            }
        }
    }, [app, path]);

    useEffect(() => {
        target && setTimeout(() => window.location.replace(target), 1500);
    }, [target]);
    
    const get_link_scheme = () => {
        let scheme = null;
        
        switch (app) {
            case CONSTANTS.SETTINGS.URLS.SUBDOMAINS.APPS.SNIPPR :
                scheme = snippr_app_scheme;
                break;
            case CONSTANTS.SETTINGS.URLS.SUBDOMAINS.APPS.SNIPPR_BIZ :
                scheme = snippr_biz_app_scheme;
                break;
        }

        return scheme;
    }

    const get_query_string = () => {
        const query_params = Object.keys(params).map((param) => {
            return `${param}=${params[param]}`;
        });

        return query_params.length ? `?${query_params.join('&')}` : '';
    }

    const parse_app_link = () => {
        const scheme = get_link_scheme();
        const query_string = get_query_string();

        if (scheme) {
            return `${scheme}://${path.join('/')}${query_string}`;
        } else {
            return null;
        }
    }

    return [target, error];
}

export default useAppRedirect;