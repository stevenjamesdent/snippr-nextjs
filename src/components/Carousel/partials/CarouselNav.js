import React, { useContext, useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import classNames from 'classnames';
import clsx from 'clsx';

import styles from '../Carousel.module.scss';

import Button from '@/components/Button/Button';

import { CarouselContext } from './CarouselContext';

const CarouselNav = ({className, style}) => {
    const { swiper } = useContext(CarouselContext);

    const [active_index, set_active_index] = useState(null);

    const class_names = classNames(styles.navitem, {
        [className]: className,
    });

    const icon_size = 25;

    React.useEffect(() => {
        (!active_index && active_index !== 0) && set_active_index(swiper?.activeIndex);

        swiper?.on('activeIndexChange', () => set_active_index(swiper?.activeIndex));
    }, [swiper]);

    const prev_disabled = React.useMemo(() => {
        return active_index === 0;
    }, [active_index])

    const next_disabled = React.useMemo(() => {
        return (active_index + 1) === swiper?.slides?.length;
    }, [active_index, swiper])

    return swiper ? (
        <div className={clsx(class_names, 'flex items-center')} style={style}>
            <Button disabled={prev_disabled} unstyled onClick={() => swiper.slidePrev()}>
                <div className={clsx('p-3 bg-navy', prev_disabled && 'opacity-50 text-white')}>
                    <ArrowLeftIcon width={icon_size} height={icon_size} />
                </div>
            </Button>

            <Button disabled={false} unstyled onClick={() => swiper.slideNext()}>
                <div className={clsx('p-3 bg-navy', next_disabled && 'opacity-50 text-white')}>
                    <ArrowRightIcon width={icon_size} height={icon_size} />
                </div>
            </Button>
        </div>
    ) : null;
};

export default CarouselNav;