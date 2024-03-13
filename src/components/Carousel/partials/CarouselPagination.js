import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';

import styles from '../Carousel.module.scss';

import Button from '@/components/Button/Button';

import { CarouselContext } from './CarouselContext';

const CarouselPagination = ({className, style}) => {
    const { swiper } = useContext(CarouselContext);

    const [active_index, set_active_index] = useState(null);

    const class_names = classNames(styles.pagination, {
        [className]: className,
    });

    React.useEffect(() => {
        (!active_index && active_index !== 0) && set_active_index(swiper?.activeIndex);

        swiper?.on('activeIndexChange', () => set_active_index(swiper?.activeIndex));
    }, [swiper]);

    return swiper ? (
        <div className={clsx(class_names, 'flex gap-1')} style={style}>
            {
                swiper?.slides?.map((slide, i) => (
                    <Button unstyled onClick={() => swiper.slideTo(i)} key={'carousel-page-' + i}>
                        <div
                            className={clsx(
                                'w-5 h-5',
                                i === active_index ? 'bg-accent' : 'bg-grey opacity-50'
                            )}
                        />
                    </Button>
                ))
            }
        </div>
    ) : null;
};

export default CarouselPagination;