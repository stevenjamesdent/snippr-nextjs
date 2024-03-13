import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';

import styles from '../Carousel.module.scss';

import { CarouselContext } from './CarouselContext';

const CarouselSibling = ({ className, style, slide = 0, children }) => {
    const { swiper } = useContext(CarouselContext);

    const [active, set_active] = useState(null);

    const class_names = classNames(styles.sibling, {
        [className]: className,
        [styles.sibling_active]: active,
    });

    React.useEffect(() => {
        !active && set_active(swiper?.activeIndex === slide);

        swiper?.on('activeIndexChange', () => set_active(
            swiper?.activeIndex === slide
        ));
    }, [swiper]);

    return swiper ? (
        <div className={class_names} style={style}>
            {children}
        </div>
    ) : null;
};

export default CarouselSibling;