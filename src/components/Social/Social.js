import React, { useState } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';
import Link from 'next/link';

import {
    EnvelopeClosedIcon,
    HeartFilledIcon,
    Link2Icon,
} from '@radix-ui/react-icons';

import Facebook from '@/assets/svg/icons/facebook.svg';
import Linkedin from '@/assets/svg/icons/linkedin.svg';
import Twitter from '@/assets/svg/icons/twitter.svg';

import styles from './Social.module.scss';

const Social = ({className, style, target, text = "SNIPPR | Snips made simple", minimal}) => {
    const [copied, set_copied] = useState(false);
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const icon_size = 18;
    const urls = {
        email: (url) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
        facebook: (url) => `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&p[title]=${encodeURIComponent(text)}`,
        linkedin: (url) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
        twitter: (url) => `http://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };

    const get_url = () => target ?? window.location.href;

    const handle_clipboard = () => {
        navigator.clipboard.writeText(get_url()).then(() => {
            set_copied(true);
            setTimeout(() => {
                set_copied(false);
            }, 3000);
        });
    }

    const handle_social = (url_handler) => {
        window.open(url_handler(get_url()), '_blank');
    }

    const render_icons = () => (
        <>
            <div className="flex gap-2 mt-5">
                <button className={clsx(styles.icon, copied && styles.icon_active)} type="button" onClick={handle_clipboard}><Link2Icon width={icon_size} height={icon_size} /></button>
                <button className={styles.icon} target="_blank" type="button" onClick={() => handle_social(urls.linkedin)}><Linkedin width={icon_size} height={icon_size} /></button>
                <button className={styles.icon} target="_blank" type="button" onClick={() => handle_social(urls.twitter)}><Twitter width={icon_size} height={icon_size} /></button>
                <button className={styles.icon} target="_blank" type="button" onClick={() => handle_social(urls.facebook)}><Facebook width={icon_size} height={icon_size} /></button>
                <button className={styles.icon} target="_blank" type="button" onClick={() => handle_social(urls.email)}><EnvelopeClosedIcon width={icon_size} height={icon_size} /></button>
            </div>
            {copied && <div className="text-accent font-light mt-5">Link copied to clipboard!</div>}
        </>
    )

    return minimal ? (
        <div className={className} style={style}>
            {render_icons()}
        </div>
    ) : (
        <div className={class_names} style={style}>
            <div className="text-charcoal text-h5 font-semibold flex items-center gap-2">
                Sharing is caring
                <HeartFilledIcon width={15} height={15} className='text-red-light' />
            </div>
            <div className="text-charcoal font-light">
                Know someone in need of simpler Snips?
            </div>
            {render_icons()}
        </div>
    );
};

export default Social;