import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";

import Marquee from "@/components/Marquee/Marquee";
import StoryblokIcon from "@/components/StoryblokIcon/StoryblokIcon";
import Content from "@/components/Content/Content";
import Heading from "@/components/Heading/Heading";

const MarqueeBlock = ({ blok }) => {
	return (
		<section className={clsx('section section-collapse', `theme-${blok.theme ?? 'default'}`)} {...storyblokEditable(blok)}>
            {blok.items?.length &&
                <Marquee>
                    {
                        blok.items.map((item) => (
                            <div key={item._uid} className='flex gap-5 items-center whitespace-nowrap px-10'>
                                <StoryblokIcon className='text-accent' size={20} source={item.icon.filename} />
                                <Heading tag='span' as='h5' script>{item.text}</Heading>
                            </div>
                        ))
                    }
                </Marquee>
            }
		</section>
	);
};

export default MarqueeBlock;