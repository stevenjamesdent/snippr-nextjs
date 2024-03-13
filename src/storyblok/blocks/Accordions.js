import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import Content from "@/components/Content/Content";
import Accordion from "@/components/Accordion/Accordion";

const AccordionsBlock = ({ blok }) => {
	return (
        <section className={`section theme-${blok.theme ?? 'default'}`} {...storyblokEditable(blok)}>
            <div className='gutter laptop:gutter-large flex flex-col gap-10'>
                <Content>
                    {render(blok.content)}
                </Content>
                <div className='flex flex-col gap-5'>
                    {
                        blok.items.map((item) => (
                            <Accordion title={item.title} key={'accordion-' + item._uid}>
                                <Content>{render(item.content)}</Content>
                            </Accordion>
                        ))
                    }
                </div>
            </div>
        </section>
	);
};

export default AccordionsBlock;