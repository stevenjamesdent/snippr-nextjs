import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";

import Content from "@/components/Content/Content";
import Image from "next/image";
import Social from "@/components/Social/Social";

const MediaBlock = ({ blok }) => {
	return (
		<section className={clsx('section', `theme-${blok.theme ?? 'default'}`)} {...storyblokEditable(blok)}>
            <div className={clsx(
                'tablet-l:gap-gutter flex gap-10 tablet-l:items-center',
                blok.reverse ? 'flex-col tablet-l:flex-row-reverse' : 'flex-col-reverse tablet-l:flex-row',
                blok.wide ? '' : 'gutter'
            )}>
                {blok.content && <Content>{render(blok.content)}</Content>}
                <Image
                    alt=""
                    className={clsx('max-h-[600px]', blok.stylised && 'opacity-80 drop-shadow-2xl rounded-2xl')}
                    height={500}
                    src={blok.asset.filename}
                    width={500}
                />
            </div>
		</section>
	);
};

export default MediaBlock;