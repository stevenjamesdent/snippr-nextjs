import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";

import Content from "@/components/Content/Content";

const WysiwygBlock = ({ blok }) => {
	return (
        <section
            className={clsx(
                `section`,
                `theme-${blok.theme ?? 'default'}`,
                blok.centre ? 'text-center' : '',
            )}
            {...storyblokEditable(blok)}
        >
            <Content className='gutter-large'>{render(blok.content)}</Content>
        </section>
	);
};

export default WysiwygBlock;