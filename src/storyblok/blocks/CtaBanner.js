import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import CallToAction from "@/components/CallToAction/CallToAction";

const CtaBannerBlock = ({ blok }) => {
	return (
        <section className='section max-mobile-l:section-collapse mobile-l:mt-10' {...storyblokEditable(blok)}>
            <div className="mobile-l:gutter laptop:gutter-large">
                <CallToAction image={blok.image.filename} link={blok.link} theme={blok.theme ?? 'snippr-dark'}>
                    {render(blok.content)}
                </CallToAction>
            </div>
        </section>
	);
};

export default CtaBannerBlock;