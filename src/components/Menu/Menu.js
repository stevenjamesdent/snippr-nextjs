import Link from 'next/link';
import classNames from 'classnames';
import clsx from 'clsx';

import styles from './Menu.module.scss';

import Button from '../Button/Button';

const Menu = ({children, className, horizontal, spaced, style}) => {
    const class_names = classNames(styles.menu, {
        [styles.menu_horizontal]: horizontal,
        [styles.menu_spaced]: spaced,
    });

    return (
        <nav className={className} style={style}>
            <ul className={class_names}>
                {children}
            </ul>
        </nav>
    );
};

const Item = ({cta, className, style, target = '_self', title, href, onClick, active}) => {
    const class_names = classNames(styles.item, {
        [className]: className,
    });

    if (cta) return (
        <li style={style} className={class_names}>
            <Button onClick={onClick} theme='cta' href={href} title={title} target={target} />
        </li>
    );

    return (
        <li style={style} className={class_names}>
            <Link onClick={onClick} className={clsx(styles.link, active && styles.link_active)} href={href} title={title} target={target}>{title}</Link>
        </li>
    );
}

Menu.Item = Item;

export default Menu;