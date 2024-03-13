import classNames from 'classnames';
import clsx from 'clsx';
import Image from 'next/image';

import styles from './CallToAction.module.scss';
import Content from '../Content/Content';
import Button from '../Button/Button';

const CallToAction = ({className, style, theme = 'snippr-dark', minimal, image, children, link }) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
        [styles.minimal]: minimal,
        [`theme-${theme}`]: theme,
    });

    return minimal ? (
        <div className={clsx(class_names, 'p-10 flex flex-col items-center')} style={style}>
            <Content className='text-center'>
                {children}
            </Content>
            {link &&
                <Button
                    className='mt-5'
                    href={link.cached_url}
                    target={link.target}
                    theme='snippr'
                    title={link.title ?? 'Find Out More'}
                />
            }
        </div>
    ) : (
        <div className={clsx(class_names, 'p-10')} style={style}>
            <div className={styles.image}>
                <Image
                    alt=""
                    className={styles.image}
                    fill
                    priority
                    src={image}
                />
            </div>
            <div className={styles.content}>
                <Content className={minimal && 'text-center'}>
                    {children}
                </Content>
                {link &&
                    <Button
                        className='mt-5'
                        href={link.cached_url}
                        target={link.target}
                        theme='snippr'
                        title={link.title ?? 'Find Out More'}
                    />
                }
            </div>
        </div>
    );
};

export default CallToAction;