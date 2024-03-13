import { storyblokEditable } from "@storyblok/react";

import Banner from "@/components/Banner/Banner";

const BannerBlock = ({ blok }) => {
	return (
        <section {...storyblokEditable(blok)}>
            <Banner cta={blok.cta} theme={blok.theme ?? null} hero={blok.hero} intro={blok.intro} title={blok.title} image={blok.image?.filename ?? null}>
                <p>{blok.text}</p>
            </Banner>
        </section>
	);
};

export default BannerBlock;