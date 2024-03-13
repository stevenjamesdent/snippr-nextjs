import React from 'react';
import { getStoryblokApi } from '@storyblok/react';

import Head from 'next/head'

import Button from '@/components/Button/Button';
import Content from '@/components/Content/Content';
import Heading from '@/components/Heading/Heading';

import lost from '@/assets/svg/graphics/lost.svg';

export default function NotFound() {
    const Lost = lost;

    return (
        <>
            <Head>
                <title>SNIPPR - Page not found</title>
                <meta name="description" content="The home of SNIPPR and SNIPPR BIZ" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='section gutter laptop-l:gutter-large grid grid-cols-1 tablet-l:grid-cols-2 gap-10 tablet-l:gap-20 items-center theme-snippr max-h-full flex-grow'>
                <div className='max-tablet-l:hidden'>
                    <Lost width={400} />
                </div>
                <div className='tablet-l:hidden'>
                    <Lost width={300} />
                </div>
                <div>
                    <Content>
                        <Heading tag='span' as='h6' script className='text-accent'>404: Page Not Found</Heading>
                        <Heading tag='h1'>Look's like that page has been Snipped!</Heading>
                        <p>
                            Sorry, but the page you're looking for doesn't exist. If it did exist, it doesn't now. Maybe it never did. Maybe it will, one day... Whatever the state of this illusive mystery page, let's get you back to where you belong, West Virginia!
                        </p>
                    </Content>
                    <Button
                        className='mt-5'
                        href='/'
                        theme='tertiary'
                        title='Take Me Home, Country Roads!'
                    />
                </div>
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