import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";

const BLOCK_TEMPLATE = ({ blok }) => {
	return (
		<section className={clsx('section', `theme-${blok.theme ?? 'default'}`)} {...storyblokEditable(blok)}>
			<div className='gutter'>

			</div>
		</section>
	);
};

export default BLOCK_TEMPLATE;