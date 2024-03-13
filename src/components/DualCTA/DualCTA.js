import classNames from 'classnames';

import styles from './DualCTA.module.scss';

import AppStore from '@/components/AppStore/AppStore';
import Panel from '@/components/Panel/Panel';
import Heading from '@/components/Heading/Heading';
import Content from '@/components/Content/Content';
import Link from 'next/link';

const DualCTA = ({className, style}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    return (
        <Panel className={class_names} style={style} rounded>
            <div className={styles.column}>
                <Heading tag='h3' as='h5' className='h-fw-semibold' uppercase>I want in!</Heading>
                <Content className='h-mb-m'>
                    <p>
                        Download SNIPPR today for iOS or Android:
                    </p>
                </Content>
                <AppStore />
            </div>
            <div className={styles.column}>
                <Heading tag='h3' as='h5' className='h-fw-semibold' uppercase>I want info...</Heading>
                <Content className='h-mb-m'>
                    <p>
                        We see you, apprehensive app downloader. You've got nothing to lose but a lot of stress-free good hair days to gain. Let us tell you more...
                    </p>
                    <Link className='h-mt-s' href='#' title='Discover'>Discover</Link>
                </Content>
            </div>
        </Panel>
    );
};

export default DualCTA;