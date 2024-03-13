import * as CONSTANTS from '@snippr/constants';

import classNames from 'classnames';

import styles from './AppStore.module.scss';

import Button from '../Button/Button';

import Apple from '@/assets/svg/appstores/apple.svg';
import Google from '@/assets/svg/appstores/google.svg';

const AppStore = ({className, style, biz = false}) => {
    const class_names = classNames(styles.container, {
        [className]: className,
    });

    const app_name = biz ? 'SNIPPR BIZ' : 'SNIPPR';
    const urls = {
        android: biz ? CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR_BIZ.ANDROID : CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.ANDROID,
        ios: biz ? CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR_BIZ.IOS : CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.IOS,
    };

    return (
        <div className={class_names} style={style}>
            <Button target="_blank" href={urls.android} unstyled title={`Download ${app_name} for Android`}><Google className={styles.google} /></Button>
            <Button target="_blank" href={urls.ios} unstyled title={`Download ${app_name} for iOS`}><Apple className={styles.apple} /></Button>
        </div>
    );
};

export default AppStore;