import AppStrip from "@/components/AppStrip/AppStrip";
import { storyblokEditable } from "@storyblok/react";

const AppStripBlock = ({ blok }) => {
	return (
		<section {...storyblokEditable(blok)}>
			<AppStrip bannerOffset={blok.banner_offset ?? false} />
		</section>
	);
};

export default AppStripBlock;