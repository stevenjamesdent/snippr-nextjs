import classNames from 'classnames';
import clsx from 'clsx';
import { SwiperSlide } from 'swiper/react';

import styles from '../Carousel.module.scss';

const CarouselItem = ({ children, className, offset, ...props }) => {
    const class_names = classNames(styles.content, {
        [className]: className,
    });

    return (
        <SwiperSlide {...props}>
            <div
                className={class_names}
                style={{
                    height: '100%',
                    paddingBottom: offset ?? 0,
                    paddingRight: offset ?? 0,
                    width: '100%',
                }}
            >
                <div className='w-full h-full relative'>{children}</div>
            </div>
        </SwiperSlide>
    );
}

CarouselItem.displayName = 'SwiperSlide';

export default CarouselItem;