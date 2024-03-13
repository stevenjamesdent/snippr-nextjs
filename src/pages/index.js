import React from 'react';
import { getStoryblokApi, StoryblokComponent, useStoryblokState } from '@storyblok/react';

import Head from 'next/head'

export default function Home({ story }) {
    story = useStoryblokState(story);

    return (
        <>
            <Head>
                <title>SNIPPR - Snips made simple</title>
                <meta name="description" content="The home of SNIPPR and SNIPPR BIZ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <StoryblokComponent blok={story.content} />
        </>
    )
}

export async function getServerSideProps(context) {
    const in_storyblok = context.query._storyblok;
    
    let slug = 'home';
    let storyblok_params = {
        resolve_links: 'url',
        version: in_storyblok ? 'draft' : 'published',
    };

    const storyblok_api = getStoryblokApi();
    let { data } = await storyblok_api.get(`cdn/stories/${slug}`, storyblok_params).catch((e) => console.warn(e)) || {};
    let { data: settings } = await storyblok_api.get('cdn/stories/settings').catch((e) => console.warn(e)) || {};

    return {
        props: {
            key: data?.story?.id ?? false,
            settings: settings?.story ?? false,
            story: data?.story ?? false,
        },
    };
}