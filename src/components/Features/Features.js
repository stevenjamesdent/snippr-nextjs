import * as Icons from '@radix-ui/react-icons';
import classNames from 'classnames';
import React from 'react';

import styles from './Features.module.scss';

import Content from '../Content/Content';
import Heading from '../Heading/Heading';
import StoryblokIcon from '../StoryblokIcon/StoryblokIcon';

const FeatureItem = ({className, style, icon = 'InfoCircledIcon', title, content, stacked = true, svgSource}) => {
    const class_names = classNames(styles.item, {
        [className]: className,
        [styles.item_inline]: !stacked,
        [styles.item_stacked]: stacked,
    });

    const render_icon = () => {
        if (svgSource) {
            return (<div className={styles.icon}><StoryblokIcon source={svgSource} /></div>);
        } else {
            const Icon = Icons[icon] ? Icons[icon] : Icons.InfoCircledIcon;
            return (<div className={styles.icon}><Icon /></div>);
        }
    }

    return stacked ? (
        <div className={class_names} style={style}>
            {render_icon()}
            {title && <Heading tag='span' className={styles.title}>{title}</Heading>}
            {content &&
                <Content>
                    {content}
                </Content>
            }
        </div>
    ) : (
        <div className={class_names} style={style}>
            {render_icon()}
            <div className={styles.content}>
                {title && <Heading tag='span' className={styles.title}>{title}</Heading>}
                {content &&
                    <Content>
                        {content}
                    </Content>
                }
            </div>
        </div>
    );
};

const Features = ({children, className, style, grid = true}) => {
    const class_names = classNames(styles.features, {
        [className]: className,
        [styles.features_grid]: grid,
        [styles.features_stacked]: !grid,
    });

    return (
        <div className={class_names} style={style}>
            {
                React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { stacked: grid });
                    } else return child;
                })
            }
        </div>
    );
};

Features.Item = FeatureItem;

export default Features;