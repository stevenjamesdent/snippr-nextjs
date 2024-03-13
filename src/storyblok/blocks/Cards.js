import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";

import Card from "@/components/Card/Card";
import Content from "@/components/Content/Content";

const CardsBlock = ({ blok }) => {
    const render_items = (offset = false) => (
        <>
            {
                blok.items.map((item, i) => (
                    <Card
                        image={item.image?.filename}
                        key={item._uid}
                        link={item.link}
                        title={item.title}
                        className={(offset && (blok.reverse ? i % 2 : !i % 2)) && 'tablet-l:mt-20'}
                    >
                        {render(item.content)}
                    </Card>
                ))
            }
        </>
    )

	return (
		<section className={clsx('section', `theme-${blok.theme ?? 'default'}`)} {...storyblokEditable(blok)}>
            {
                blok.items?.length === 1 ?
                    <div className={clsx(
                        'gutter-large flex gap-5 tablet-l:gap-gutter tablet-l:items-center',
                        `theme-${blok.theme ?? 'default'}`,
                        blok.reverse ? 'flex-col tablet-l:flex-row-reverse' : 'flex-col-reverse tablet-l:flex-row',
                    )}>
                        {blok.content && <Content>{render(blok.content)}</Content>}
                        {render_items()}
                    </div>
                : blok.items?.length === 2 ?
                    <div className={clsx(
                        'gutter flex justify-center gap-10 tablet-l:gap-gutter tablet-l:items-center',
                        `theme-${blok.theme ?? 'default'}`,
                        blok.reverse ? 'flex-col tablet-l:flex-row-reverse' : 'flex-col-reverse tablet-l:flex-row',
                    )}>
                        <div className='basis-1/3'>{blok.content && <Content>{render(blok.content)}</Content>}</div>
                        <div className='flex max-tablet-l:flex-col tablet-l:items-start gap-5'>
                            {render_items(true)}
                        </div>
                    </div>
                :
                    <>
                        {blok.content && <Content className='gutter-large text-center mb-10'>{render(blok.content)}</Content>}
                        <div className='gutter-small flex flex-wrap gap-5 justify-center'>
                            {render_items()}
                        </div>
                    </>
            }
		</section>
	);
};

export default CardsBlock;