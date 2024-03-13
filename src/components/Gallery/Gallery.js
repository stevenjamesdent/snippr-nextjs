import classNames from 'classnames';
import clsx from 'clsx';
import React, { useRef, useEffect } from "react";
import Image from 'next/image';

import { Carousel as NativeCarousel, Fancybox as NativeFancybox } from "@fancyapps/ui";
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';

import '@fancyapps/ui/dist/carousel/carousel.css';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import styles from './Gallery.module.scss';

const GalleryImage = ({className, style, src, thumb = src, alt}) => {
    const class_names = classNames(styles.slide, {
        [className]: className,
    });

    return (
        <a
            className={clsx(class_names, 'f-carousel__slide')}
            data-fancybox="gallery"
            data-thumb-src={thumb}
            href={src}
            style={style}
        >
            <Image width={1600} height={1000} src={src} alt={alt} />
        </a>
    );
}

const Gallery = ({className, style, children}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const carousel_ref = useRef();
    const lightbox_ref = useRef();

    useEffect(() => {
        const carousel = carousel_ref.current;
        const lightbox = lightbox_ref.current;

        NativeFancybox.bind(lightbox, '[data-fancybox]');
    
        const instance = new NativeCarousel(carousel, {
            Dots: false,
            Thumbs: {
                Carousel: {
                    center: false,
                    fill: false,
                },
                type: 'classic',
            },
        }, { Thumbs });
        

        return () => {
            instance.destroy();
            NativeFancybox.unbind(lightbox);
            NativeFancybox.close();
        };
    });

    return (
        <div className={class_names} ref={lightbox_ref}>
            <div ref={carousel_ref} className='f-carousel' style={style}>
                {children}
            </div>
        </div>
    );
};

Gallery.Image = GalleryImage;

export default Gallery;