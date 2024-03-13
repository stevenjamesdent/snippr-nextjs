import classNames from 'classnames';

import styles from './Heading.module.scss';

const Heading = ({as = null, children, style, tag = 'h2', giga, mega, center, script = false, className, uppercase, collapse}) => {
    const valid_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
    
    if (!valid_tags.includes(tag)) throw new Error('Error in <Heading /> component: invalid tag supplied');

    const class_names = classNames(styles.heading, {
        [styles['heading_' + tag]]: as === null,
        [styles['heading_' + as]]: as && valid_tags.includes(as),
        [styles.heading_giga]: giga,
        [styles.heading_mega]: mega,
        [styles.heading_center]: center,
        [styles.heading_uppercase]: uppercase,
        [styles.heading_collapse]: collapse,
        ['font-script']: script,
        [className]: className,
    });

    const Tag = tag;

    return (
        <Tag className={class_names} style={style}>
            <div className={className}>
                {children}
            </div>
        </Tag>
    );
};

export default Heading;