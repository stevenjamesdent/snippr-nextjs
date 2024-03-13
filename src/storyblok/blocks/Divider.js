import Divider from "@/components/Divider/Divider";
import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";

const DividerBlock = ({ blok }) => {
	return (
		<div className={clsx('section section-collapse py-2', `theme-${blok.theme ?? 'default'}`)} {...storyblokEditable(blok)}>
            <div className={blok.gutter ?? ''}>
				<Divider />
			</div>
		</div>
	);
};

export default DividerBlock;