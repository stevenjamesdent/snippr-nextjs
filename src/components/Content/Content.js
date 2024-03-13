import classNames from 'classnames';

import styles from './Content.module.scss';

const Content = ({center, children, className, right, style}) => {
    const class_names = classNames(styles.content, {
        [styles.content_center]: center,
        [styles.content_right]: right,
    });
    
    return (
        <div className={class_names} style={style}>
            <div className={className}>{children}</div>
        </div>
    );
};

Content.Html = ({data}) => <div dangerouslySetInnerHTML={{__html: data}} />;

export default Content;