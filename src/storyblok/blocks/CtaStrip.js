import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import CallToAction from "@/components/CallToAction/CallToAction";

const CtaStripBlock = ({ blok }) => {
	return (
        <section className="section section-collapse" {...storyblokEditable(blok)}>
            <CallToAction minimal link={blok.link} theme={blok.theme ?? 'snippr-dark'}>
                {render(blok.content)}
            </CallToAction>
        </section>
	);
};

export default CtaStripBlock;