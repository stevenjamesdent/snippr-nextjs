import React from 'react';
import { getStoryblokApi } from '@storyblok/react';

import Head from 'next/head'
import DownloadHero from '@/components/DownloadHero/DownloadHero';

export default function DownloadSnipprBiz() {
    return (
        <>
            <Head>
                <title>SNIPPR - Download Now</title>
                <meta name="description" content="Download SNIPPR BIZ for iOS or Android" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <DownloadHero biz />
            </main>
        </>
    )
}

export async function getStaticProps() {
    const storyblok_api = getStoryblokApi();
    let { data: settings } = await storyblok_api.get('cdn/stories/settings').catch((e) => console.warn(e)) || {};

    return {
        props: {
            settings: settings?.story ?? false,
        },
        revalidate: 10,
    };
}