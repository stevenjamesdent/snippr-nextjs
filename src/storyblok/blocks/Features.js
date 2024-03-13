import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import Content from "@/components/Content/Content";
import Features from "@/components/Features/Features";

const FeaturesBlock = ({ blok }) => {
	return blok.grid ? (
		<section className={`section theme-${blok.theme ?? 'default'}`} {...storyblokEditable(blok)}>
            <div className='gutter'>
                {blok.content && <Content>{render(blok.content)}</Content>}
                <Features className='mt-10'>
                    {
                        blok.items.map((item) => (
                            <Features.Item
                                content={render(item.content)}
                                key={item._uid}
                                svgSource={item.icon.filename}
                                title={item.title}
                            />
                        ))
                    }
                </Features>
            </div>
		</section>
	) : (
        <section className={`section theme-${blok.theme ?? 'default'}`} {...storyblokEditable(blok)}>
            <div className='gutter laptop-l:gutter-large grid grid-cols-1 tablet-l:grid-cols-2 gap-12 tablet-l:gap-40'>
                {blok.content && <Content>{render(blok.content)}</Content>}
                <div className='bg-white theme-default drop-shadow-2xl rounded-2xl p-5 mobile-l:p-10'>
                    <Features grid={false}>
                        {
                            blok.items.map((item) => (
                                <Features.Item
                                    content={render(item.content)}
                                    key={item._uid}
                                    svgSource={item.icon.filename}
                                    title={item.title}
                                />
                            ))
                        }
                    </Features>
                </div>
            </div>
        </section>
    );
};

export default FeaturesBlock;