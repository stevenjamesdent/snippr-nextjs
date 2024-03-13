import { storyblokEditable } from "@storyblok/react";

import Logo from "@/components/Logo/Logo";
import Heading from "@/components/Heading/Heading";

const LogoBlock = ({ blok }) => {
	return (
		<section className={`section ${!blok.spaced ? 'pb-0' : ''} theme-${blok.theme ?? 'default'}`} {...storyblokEditable(blok)}>
            <div className="gutter flex flex-col items-center">
                <Logo light={blok.light} biz={blok.biz} scale={0.75} />
                {
                    blok.tagline ?
                        <div className='mt-2'>
                            <Heading tag='span' as='h3' collapse script center>
                                {blok.biz ? 'Snipping made simple' : 'Snips made simple'}
                            </Heading>
                        </div>
                    : null
                }
            </div>
		</section>
	);
};

export default LogoBlock;