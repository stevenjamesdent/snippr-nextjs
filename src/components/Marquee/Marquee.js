import React from 'react';
import classNames from 'classnames';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import styles from './Marquee.module.scss';

const Marquee = ({className, style, children}) => {
    const class_names = classNames(styles.marquee, {
        [className]: className,
    });

    const total_slides = React.Children.toArray(children).length;
    const slides_per_view = 6;

    return (
        <div className={clsx(class_names)} style={style}>
            <Swiper
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={100}
                speed={3000}
            >
                {
                    total_slides >= (slides_per_view * 2)
                        ?
                            React.Children.map(children, child => {
                                if (React.isValidElement(child)) {
                                    return (
                                        <SwiperSlide style={{ width: 'fit-content' }}>
                                            {React.cloneElement(child)}
                                        </SwiperSlide>
                                    );
                                } else return child;
                            })
                        :
                            [...Array(Math.ceil((slides_per_view * 2) / total_slides))].map(
                                (e, i) => React.Children.map(children, child => {
                                    if (React.isValidElement(child)) {
                                        return (
                                            <SwiperSlide style={{ width: 'fit-content' }}>
                                                {React.cloneElement(child)}
                                            </SwiperSlide>
                                        );
                                    } else return child;
                                })
                            )
                }
            </Swiper>
        </div>
    );
};

export default Marquee;