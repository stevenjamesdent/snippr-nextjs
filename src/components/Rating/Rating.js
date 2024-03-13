import * as CONSTANTS from '@snippr/constants';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';

import styles from './Rating.module.scss';

import StarSVG from '../../assets/svg/icons/star.svg';
import QuarterStarSVG from '../../assets/svg/icons/star_quarter.svg';
import HalfStarSVG from '../../assets/svg/icons/star_half.svg';
import ThreeQuarterStarSVG from '../../assets/svg/icons/star_three_quarters.svg';

const scores = { high: 4, low: 2 }

const Rating = ({className, style, score, count, size = 20}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
        [styles.wrapper_bad]: !isNaN(score) && score <= scores.low,
        [styles.wrapper_good]: !isNaN(score) && score > scores.high,
        [styles.wrapper_new]: isNaN(score),
    });

    const [full_star_count, set_full_star_count] = useState(0);
    const [partial_star, set_partial_star] = useState(false);

    const total_star_count = 5;
    const star_size = size;

    useEffect(() => {
        if (!isNaN(score)) {
            let rating_int = Math.floor(score);
            let rating_remainder = score % 1;
            
            if (rating_remainder < 0.125) {
                rating_remainder = false;
            } else if (rating_remainder < 0.375) {
                rating_remainder = 0.25;
            } else if (rating_remainder < 0.625) {
                rating_remainder = 0.50;
            } else {
                rating_remainder = 0.75;
            }

            if (score > total_star_count) {
                rating_int = 5;
                rating_remainder = 0;
            }

            if (score < 0) {
                rating_int = 0;
                rating_remainder = 0;
            }

            set_full_star_count(rating_int);
            set_partial_star(rating_remainder);
        }
    }, [score]);

    return isNaN(score) ? (
        <div className={clsx(class_names, 'flex items-center gap-2')} style={style}>
            <StarSVG width={star_size} height={star_size} />
            <div className='text-sm font-semibold'>{CONSTANTS.SETTINGS.BADGES.NEW.NAME}</div>
        </div>
    ) : (
        <div className={class_names} style={style}>
            <div className="sr-only">
                <label htmlFor="rating">Snipper Rating (Based on {count} reviews)</label>
                <meter id="rating" min="0" max={total_star_count} low={scores.low} high={scores.high} value={score}>{score}/{total_star_count}</meter>
            </div>
            <div className='flex items-center' style={{ width: total_star_count * star_size }}>
                <div className={clsx(styles.background, `flex items-center ${score > 0 ? 'absolute -z-10' : ''}`)}>
                    {
                        [...Array(total_star_count)].map((element, index) => {
                            return <StarSVG key={index} width={star_size} height={star_size} />
                        })
                    }
                </div>
                {
                    [...Array(full_star_count)].map((element, index) => {
                        return <StarSVG key={index} width={star_size} height={star_size} />
                    })
                }
                {partial_star === 0.25 && <QuarterStarSVG width={star_size} height={star_size} />}
                {partial_star === 0.5 && <HalfStarSVG width={star_size} height={star_size} />}
                {partial_star === 0.75 && <ThreeQuarterStarSVG width={star_size} height={star_size} />}
            </div>
            <div className='text-sm font-semibold'>{score} ({count})</div>
        </div>
    );
};

export default Rating;