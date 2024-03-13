import classNames from 'classnames';
import clsx from 'clsx';

import styles from './TEMPLATE.module.scss';

const TEMPLATE = ({className, style}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    return (
        <div className={class_names} style={style}>

        </div>
    );
};

export default TEMPLATE;