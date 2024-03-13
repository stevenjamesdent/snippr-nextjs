import * as CONSTANTS from '@snippr/constants';

import { poppins, zing_base, zing_script } from '@/utils/fonts';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import clsx from 'clsx';
import Script from 'next/script';

import '@/styles/core/index.scss';
import '@/styles/globals.css';

import Layout from '@/components/Layout/Layout';
import useAppCheck from '@/hooks/useAppCheck';

import { bloks } from '@/storyblok';
import { useRouter } from 'next/router';
import Head from 'next/head';

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    components: bloks,
    use: [apiPlugin],
});

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const in_storyblok = router?.query?._storyblok ?? false;
    const live_env = !in_storyblok && process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
    
    useAppCheck();

    return (
        <>
            {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' &&
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
            }

            {live_env &&
                <>
                    <Script id='iubenda-cookie-banner-script'> 
                        {`
                            var _iub = _iub || [];
                            _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"cookiePolicyInOtherWindow":true,"enableRemoteConsent":true,"enableTcf":true,"floatingPreferencesButtonCaptionColor":"#FFFFFF","floatingPreferencesButtonColor":"#2C324A","floatingPreferencesButtonDisplay":"bottom-left","floatingPreferencesButtonIcon":false,"googleAdditionalConsentMode":true,"lang":"en-GB","perPurposeConsent":true,"reloadOnConsent":true,"siteId":2981198,"tcfPurposes":{"2":"consent_only","3":"consent_only","4":"consent_only","5":"consent_only","6":"consent_only","7":"consent_only","8":"consent_only","9":"consent_only","10":"consent_only"},"cookiePolicyId":78029071,"floatingPreferencesButtonCaption":true, "banner":{ "acceptButtonColor":"#00AEBC","acceptButtonDisplay":true,"backgroundColor":"#2C324A","closeButtonDisplay":false,"customizeButtonColor":"#1E2337","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":null,"position":"bottom","rejectButtonColor":"#FF6B6B","rejectButtonDisplay":true }};
                        `}
                    </Script>

                    <Script src='https://cdn.iubenda.com/cs/tcf/stub-v2.js' />
                    <Script src='https://cdn.iubenda.com/cs/tcf/safe-tcf-v2.js' />
                    <Script async src='https://cdn.iubenda.com/cs/iubenda_cs.js' />

                    <Script id="hotjar">
                        {`
                            (function(h,o,t,j,a,r){
                                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                h._hjSettings={hjid:3666706,hjsv:6};
                                a=o.getElementsByTagName('head')[0];
                                r=o.createElement('script');r.async=1;
                                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                        `}
                    </Script>
                </>
            }
            
            <Layout className={clsx(poppins.variable, zing_base.variable, zing_script.variable)} settings={pageProps.settings?.content ?? null}>
                <Component {...pageProps} />
            </Layout>

            {live_env &&
                <Script id="tidio-script" async src="//code.tidio.co/y5wkqglsx532wabajwdzszvt73w5dqfx.js" />
            }
        </>
    );
}