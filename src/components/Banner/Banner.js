import classNames from 'classnames';
import Image from 'next/image';
import clsx from 'clsx';

import styles from './Banner.module.scss';

import Button from '../Button/Button';
import Content from '../Content/Content';
import Heading from '../Heading/Heading';

import Cutout from '@/assets/svg/cutout/bottom-right.svg';

const Banner = ({className, style, title, hero = false, children, intro, theme = 'snippr-dark', image, cta}) => {
    const class_names = classNames(styles.banner, {
        [className]: className,
        [`theme-${theme}`]: theme,
        [styles.banner_hero]: hero,
        [styles.banner_default]: !theme,
    });
    
    return (
        <section style={style} className={class_names} data-banner>
            <div className={styles.content}>
                <Heading collapse tag='span' as={hero ? 'h3' : 'h5'} script={hero} className='mb-5 text-accent'>{intro}</Heading>
                <Heading collapse tag='h1' mega className='mt-0' uppercase={hero}>{title}</Heading>
                <Content className='mt-5 mb-5 text-large font-extralight'>
                    {children}
                </Content>
                {cta &&
                    <Button
                        className='mt-5'
                        href={cta.cached_url}
                        target={cta.target}
                        theme='glass'
                        title={cta.title ?? 'Find Out More'}
                    />
                }
            </div>
            {hero && <Cutout className={styles.cutout} />}
            {image &&
                <div className={clsx(styles.image_wrapper, !hero && styles.image_wrapper_minimal)}>
                    <Image fill className={styles.image} src={image} alt="" priority />
                </div>
            }
        </section>
    );
};

export default Banner;