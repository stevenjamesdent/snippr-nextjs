import classNames from 'classnames';
import clsx from 'clsx';

import styles from './Icon.module.scss';

const Icon = ({className, style, icon, size = 20}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    const IconSvg = icon;

    return (
        <div className={class_names} style={style}>
            <IconSvg width={size} height={size} />
        </div>
    );
};

export default Icon;