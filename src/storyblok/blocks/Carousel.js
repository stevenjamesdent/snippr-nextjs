import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import clsx from "clsx";

import Image from "next/image";

import Carousel from "@/components/Carousel/Carousel";
import Content from "@/components/Content/Content";

const CarouselBlock = ({ blok }) => {
	return (
        <section
            className={clsx(
                'section',
                `theme-${blok.theme ?? 'default'}`
            )}
            {...storyblokEditable(blok)}
        >
            <div className='gutter-small laptop-l:gutter flex max-tablet-l:flex-col-reverse gap-20 tablet-l:gap-40 justify-center'>
                <Carousel.Provider>
                    <div className='flex flex-col basis-[40%]'>
                        <Content className='relative mb-5'>
                            {
                                blok.items.map((item, i) => (
                                    <Carousel.Sibling slide={i} key={'sibling-' + item._uid}>
                                        <Content>{render(item.content)}</Content>
                                    </Carousel.Sibling>
                                ))
                            }
                        </Content>
                        <div className='flex justify-between mt-auto'>
                            <Carousel.Nav />
                            <Carousel.Pagination className='mt-auto' />
                        </div>
                    </div>
                    <Carousel className='max-w-[300px] max-tablet-l:max-h-[300px] tablet-l:max-w-[400px] laptop:max-w-[500px]'>
                        {
                            blok.items.map((item) => (
                                <Carousel.Item key={'item-' + item._uid}>
                                    <Image
                                        alt=""
                                        fill
                                        src={item.image.filename}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </Carousel.Provider>
            </div>
        </section>
	);
};

export default CarouselBlock;