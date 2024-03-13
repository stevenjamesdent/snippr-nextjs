import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.scss';

import Content from '../Content/Content';
import Heading from '../Heading/Heading';

const Card = ({children, className, style, title, link, image}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const render_body = () => (
        <>
            <div className={styles.image}>
                <Image
                    alt=""
                    src={image}
                    fill
                />
            </div>
            <div className={styles.body}>
                {title && <Heading tag='span' as='h5'>{title}</Heading>}
                <Content className={styles.content}>
                    {children}
                </Content>
                {link &&
                    <span className={styles.cta}>
                        {link.title}
                    </span>
                }
            </div>
        </>
    )

    return link?.cached_url?.length ? (
        <Link
            className={class_names}
            href={link.cached_url}
            style={style}
            target={link.target ?? '_self'}
            title={link.title}
        >
            {render_body()}
        </Link>
    ) : (
        <div className={class_names} style={style}>
            {render_body()}
        </div>
    );
};

export default Card;