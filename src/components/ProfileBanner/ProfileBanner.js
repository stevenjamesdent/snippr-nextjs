import { sanitize } from "isomorphic-dompurify";
import classNames from 'classnames';
import clsx from 'clsx';
import Image from 'next/image';

import styles from './ProfileBanner.module.scss';
import placeholder from '@/assets/img/avatar-placeholder.png';
import Link from "next/link";

const ProfileBanner = ({ className, style, data }) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    return (
        <section className={class_names} style={style} data-banner>
            <div className={styles.cover}>
                {data?.cover_url ?
                    <Image
                        alt=""
                        fill
                        priority
                        src={data.cover_url}
                    />
                : null}
            </div>
            <Image
                alt=""
                priority
                className={styles.avatar}
                width={300}
                height={300}
                src={data?.avatar_url ?? placeholder}
            />
            {data?.shareable?.qr ? 
                <Link href={data?.shareable?.url} className={styles.qr}>
                    <div dangerouslySetInnerHTML={{ __html: sanitize(data.shareable.qr) }} />
                    <span className='text-sm font-light text-white leading-none'>Find them on <span className='font-bold text-red-light'>SNIPPR</span></span>
                </Link>
            : null}
        </section>
    );
};

export default ProfileBanner;