import classNames from 'classnames';

import styles from './Panel.module.scss';

const Panel = ({children, className, style}) => {
    const class_names = classNames(styles.panel, {
        [className]: className,
    });

    return (
        <div className={class_names} style={style}>
            {children}
        </div>
    );
};

export default Panel;