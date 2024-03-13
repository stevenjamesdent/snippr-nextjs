import classNames from 'classnames';
import clsx from 'clsx';

import styles from './AppStrip.module.scss';

import AppStore from '@/components/AppStore/AppStore';
import Heading from '@/components/Heading/Heading';
import Logo from '@/components/Logo/Logo';

const AppStrip = ({className, style, bannerOffset}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
        ['section-banner-offset']: bannerOffset,
    });

    return (
        <section className={clsx(class_names, 'section section-brand-gradient theme-biz-dark')} style={style}>
            <div className={styles.column}>
                <Logo light scale={0.75} />
                <Heading tag='h2' as='h6' script>For customers - Schedule your Snips</Heading>
                <AppStore />
            </div>
            <div className={styles.column}>
                <Logo biz light scale={0.75} />
                <Heading tag='h2' as='h6' script>For hair stylists - Manage your Snips</Heading>
                <AppStore biz />
            </div>
        </section>
    );
};

export default AppStrip;