import classNames from 'classnames';

import styles from './Divider.module.scss';

const Divider = ({style, className, vertical}) => {
    const class_names = classNames(styles.divider, {
        [className]: className,
        [styles.divider_vertical]: vertical,
    });

    return <hr className={class_names} style={style} />;
};

export default Divider;