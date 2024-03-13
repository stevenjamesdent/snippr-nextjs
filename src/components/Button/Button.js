import Link from 'next/link';
import classNames from 'classnames';

import styles from './Button.module.scss';

const Button = ({children, className, href, onClick, style, target, theme = 'primary', title, unstyled, shadow, submit, disabled, small}) => {
    const class_names = classNames(styles.button, {
        [styles['button_' + theme]]: theme,
        [styles.button_unstyled]: unstyled,
        [styles.button_shadowed]: shadow,
        [styles.button_small]: small,
        [className]: className,
    });

    if (href) return (
        <Link onClick={onClick} className={class_names} href={href} title={title} target={target}>{children ?? title}</Link>
    )

    return (
        <button type={submit ? 'submit' : 'button'} disabled={disabled} className={class_names} style={style} title={title} onClick={disabled ? null : onClick}>
            {children ?? title}
        </button>
    );
};

export default Button;