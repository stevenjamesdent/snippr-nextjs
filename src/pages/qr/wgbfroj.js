import * as CONSTANTS from '@snippr/constants';

import React, { useEffect, useState } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

import Head from 'next/head'
import Redirect from '@/components/Redirect/Redirect';

export default function Wgbfroj() {
    const [target, set_target] = useState(null);

    useEffect(() => {
        if (isAndroid) {
            set_target(CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.ANDROID);
        } else if (isIOS) {
            set_target(CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.IOS);
        } else {
            set_target(CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.GENERIC);
        }
    }, []);

    useEffect(() => {
        target && setTimeout(() => window.location.replace(target), 1500);
    }, [target]);

    return (
        <>
            <Head>
                <title>SNIPPR - Redirecting...</title>
                <meta name="description" content="The home of SNIPPR and SNIPPR BIZ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Redirect target={target} />
        </>
    )
}