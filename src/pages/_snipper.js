import * as CONSTANTS from '@snippr/constants';

import React from 'react';
import { getStoryblokApi } from '@storyblok/react';
import moment from 'moment';

import Head from 'next/head'

import AppStore from '@/components/AppStore/AppStore';
import Content from '@/components/Content/Content';
import Gallery from '@/components/Gallery/Gallery';
import Heading from '@/components/Heading/Heading';
import Icon from '@/components/Icon/Icon';
import Map from '@/components/Map/Map';
import ProfileBanner from '@/components/ProfileBanner/ProfileBanner';
import Rating from '@/components/Rating/Rating';

import scissors from '@/assets/svg/icons/scissors.svg';
import { get_snipper_profiles } from '@/utils/profiles';
import Image from 'next/image';

export default function SnipperLanding({ snipper }) {
    const today = moment().format(CONSTANTS.SETTINGS.MOMENT.FORMATS.DAY);

    return (
        <>
            <Head>
                <title>SNIPPR - {snipper[CONSTANTS.FIELDS.USERS.DISPLAY_NAME]}</title>
                <meta name="description" content="Download SNIPPR for iOS or Android" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <ProfileBanner data={snipper} />

                <section className="section">
                    <div className="gutter-profile grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-gutter">
                        <div>
                            <Heading tag='h1' as='h2'>{snipper[CONSTANTS.FIELDS.USERS.DISPLAY_NAME]}</Heading>
                            {snipper[CONSTANTS.FIELDS.USERS.TAGLINE] && <Heading tag='h2' as='h5'>{snipper[CONSTANTS.FIELDS.USERS.TAGLINE]}</Heading>}
                            
                            <hr className="hr my-5" />
                            <div className="flex items-center gap-5 text-sm">
                                {snipper?.badges?.[CONSTANTS.SETTINGS.BADGES.FOUNDER.ID] &&
                                    <span className="px-5 py-1 rounded-full bg-red-light text-white font-semibold italic">
                                        {CONSTANTS.SETTINGS.BADGES.FOUNDER.NAME}
                                    </span>
                                }
                                {!snipper?.badges?.[CONSTANTS.SETTINGS.BADGES.LEGEND.ID] &&
                                    <span className="px-5 py-1 rounded-full bg-navy text-white font-semibold">
                                        {CONSTANTS.SETTINGS.BADGES.LEGEND.NAME}
                                    </span>
                                }
                                {snipper?.badges?.[CONSTANTS.SETTINGS.BADGES.NEW.ID] &&
                                    <span className="px-5 py-1 rounded-full bg-off-white text-grey-dark font-semibold">
                                        {CONSTANTS.SETTINGS.BADGES.NEW.NAME}
                                    </span>
                                }
                            </div>
                            <hr className="hr my-5" />

                            {snipper[CONSTANTS.FIELDS.USERS.BIO] ?
                                <Content>
                                    <p>{snipper[CONSTANTS.FIELDS.USERS.BIO]}</p>
                                </Content>
                            : null}

                            <div className='flex items-center gap-10 mt-5'>
                                {snipper?.stats?.[CONSTANTS.SETTINGS.STATS.AVERAGE_RATING.ID] ?
                                    <Rating
                                        count={snipper.stats[CONSTANTS.SETTINGS.STATS.RATING_COUNT.ID]}
                                        score={snipper.stats[CONSTANTS.SETTINGS.STATS.AVERAGE_RATING.ID]}
                                    />
                                : null}
                                
                                {snipper?.stats?.[CONSTANTS.SETTINGS.STATS.SNIP_COUNT.ID] ?
                                    <div className='flex items-center gap-2 text-sm font-semibold text-grey'>
                                        <Icon icon={scissors} />
                                        {snipper.stats[CONSTANTS.SETTINGS.STATS.SNIP_COUNT.ID]} Snips
                                    </div>
                                : null}
                            </div>
                            {snipper?.gallery?.length ?
                                <Gallery className='mt-10'>
                                    {
                                        snipper.gallery.map((url, i) => (
                                            <Gallery.Image key={`gallery-${i}`} src={url} alt='' />
                                        ))
                                    }
                                </Gallery>
                            : null}
                        </div>
                        <div className='flex flex-col gap-10'>
                            {snipper?.area?.[CONSTANTS.FIELDS.AREAS.RADIUS_MILES] ?
                                <div className="rounded-2xl overflow-hidden">
                                    <Map
                                        center={{
                                            lat: snipper?.area?.[CONSTANTS.FIELDS.AREAS.CENTER_LATITUDE],
                                            lng: snipper?.area?.[CONSTANTS.FIELDS.AREAS.CENTER_LONGITUDE]
                                        }}
                                        radius={{
                                            center: {
                                                lat: snipper?.area?.[CONSTANTS.FIELDS.AREAS.CENTER_LATITUDE],
                                                lng: snipper?.area?.[CONSTANTS.FIELDS.AREAS.CENTER_LONGITUDE]
                                            },
                                            miles: snipper?.area?.[CONSTANTS.FIELDS.AREAS.RADIUS_MILES]
                                        }}
                                    />
                                </div>
                            : null}
                            <div className="p-10 rounded-2xl bg-navy-dark theme-snippr-dark">
                                <Heading tag='h3' as='h5'>Book your next Snip with <span className="text-accent">{snipper[CONSTANTS.FIELDS.USERS.DISPLAY_NAME]}</span> on SNIPPR</Heading>
                                <Content>
                                    <p>Download <span className='font-bold'>SNIPPR</span> for iOS or Android and book a Snip with them today, super simple!</p>
                                </Content>
                                <AppStore className='mt-5' />
                            </div>
                            <div className="p-10 rounded-2xl bg-white shadow-2xl theme-snippr">
                                <Heading tag='h3' as='h5'>Opening Times</Heading>
                                <Content>
                                    <p>
                                        {
                                            snipper?.availability?.[today.toLowerCase()]?.working
                                                ? 'Open today, better get that Snip booked before slots run out!'
                                                : 'Closed today, why not get a Snip booked for their next opening?'
                                        }
                                    </p>
                                </Content>
                                <table className='table-auto text-grey-dark mt-5'>
                                    <tbody>
                                        {
                                            CONSTANTS.TERMS.DAYS.map((day, i) => {
                                                const hours = snipper?.availability?.[day] ?? null;
                                                const active = day.toLowerCase() === today.toLowerCase();

                                                return (
                                                    <tr key={`hours-${i}`} className={active ? 'text-red-light' : undefined}>
                                                        <td className='font-semibold capitalize py-2 pr-20'>{day}</td>
                                                        <td className='py-2'>{hours?.working ? `${hours.start} - ${hours.finish}` : 'Closed'}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const storyblok_api = getStoryblokApi();
    let { data: settings } = await storyblok_api.get('cdn/stories/settings').catch((e) => console.warn(e)) || {};
    const profile = await get_snipper_profiles(context.req.headers['snipper-slug']);

    return {
        props: {
            settings: settings?.story ?? false,
            snipper: profile,
        },
    };
}