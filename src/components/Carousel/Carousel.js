import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Swiper } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';

import styles from './Carousel.module.scss';

import { CarouselContext, CarouselContextProvider } from './partials/CarouselContext';
import CarouselItem from './partials/CarouselItem';
import CarouselNav from './partials/CarouselNav';
import CarouselPagination from './partials/CarouselPagination';
import CarouselSibling from './partials/CarouselSibling';

const Carousel = ({ children, className, style, offset = 30, ...props }) => {
    const { set_swiper } = useContext(CarouselContext);

    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const effect = {
        prev: {
            opacity: 0,
            translate: ['-100%', '-100%', 0],
        },
        next: {
            translate: [offset, offset, -offset],
            origin: 'center',
        },
    };

    return (
        <div className={class_names}>
            <div className={styles.carousel}>
                <Swiper
                    creativeEffect={effect}
                    effect={'creative'}
                    modules={[EffectCreative]}
                    onSwiper={(swiper) => set_swiper(swiper)}
                    onActiveIndexChange={(swiper) => set_swiper(swiper)}
                    style={{ width: `calc(100% + ${offset}px)`, height: `calc(100% + ${offset}px)` }}
                    className={styles.swiper}
                    {...props}
                >
                    {
                        React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, { offset });
                            } else return child;
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

Carousel.Item = CarouselItem;
Carousel.Nav = CarouselNav;
Carousel.Pagination = CarouselPagination;
Carousel.Provider = CarouselContextProvider;
Carousel.Sibling = CarouselSibling;

export default Carousel;