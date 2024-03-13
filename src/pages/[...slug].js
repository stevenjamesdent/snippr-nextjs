import React from 'react';
import { getStoryblokApi, StoryblokComponent, useStoryblokState } from '@storyblok/react';

import Head from 'next/head'

export default function Page({ story }) {
    story = useStoryblokState(story);

    return (
        <>
            <Head>
                <title>{`SNIPPR - ${story?.name}` ?? 'SNIPPR - Snips made simple'}</title>
                <meta name="description" content="The home of SNIPPR and SNIPPR BIZ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <StoryblokComponent blok={story.content} />
        </>
    )
}

export async function getStaticProps({ params }) {
    let slug = params.slug ? params.slug.join("/") : "home";
    let storyblok_params = {
        resolve_links: 'url',
        version: 'draft',
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
        revalidate: 10,
    };
}

export async function getStaticPaths() {
    const storyblok_api = getStoryblokApi();
    let { data } = await storyblok_api.get(`cdn/links/`, {
        version: 'draft'
    });

    let paths = [];

    Object.keys(data.links).forEach((link_key) => {
        if (data.links[link_key].is_folder || data.links[link_key].slug === 'home') {
            return;
        }
        
        const slug = data.links[link_key].slug;
        let split_slug = slug.split('/');

        paths.push({ params: { slug: split_slug } });
    });

    return {
        paths: paths,
        fallback: false,
    };
}