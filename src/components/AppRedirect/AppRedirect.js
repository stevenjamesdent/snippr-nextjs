import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/router'
import { useState } from 'react';

import classNames from 'classnames';
import { useEffect } from 'react';

import Heading from '../Heading/Heading';

import styles from './AppRedirect.module.scss';
import Logo from '../Logo/Logo';

const AppRedirect = ({className, style, title = 'Hang on tight!', subtitle = 'Give us a moment while we redirect you to the right place...'}) => {
    const router = useRouter();
    const { path, ...params } = router.query;

    const snippr_app_scheme = 'snippr.app';
    const snippr_biz_app_scheme = 'snippr.biz.app';

    const [error, set_error] = useState(null);

    const class_names = classNames(styles.redirect, {
        [className]: className,
    });

    useEffect(() => {
        path && window.location.replace(parse_app_link());
    }, [path]);
    
    const get_link_scheme = (root) => {
        let scheme = null;
        
        switch (root) {
            case 'snippr' :
                scheme = snippr_app_scheme;
                break;
            case 'snippr-biz' :
                scheme = snippr_biz_app_scheme;
                break;
        }

        return scheme;
    }

    const get_query_string = () => {
        const query_params = Object.keys(params).map((param) => {
            return `${param}=${params[param]}`;
        });

        return query_params.length ? `?${query_params.join('&')}` : '';
    }

    const parse_app_link = () => {
        const root = path.shift();
        const scheme = get_link_scheme(root);
        const query_string = get_query_string();

        if (scheme) {
            return `${scheme}://${path.join('/')}${query_string}`;
        } else {
            set_error('Oops! something went wrong with our redirect, if the error persists please contact support.')
        }
    }

    return (
        <div style={style} className={class_names}>
            <div className={styles.content}>
                <Logo scale={0.65} light />
                <Heading className='h-mb-0 h-mt-m' tag='h1' center>{title}</Heading>
                <Heading className='h-mb-l' tag='h2' as='h6' center>{subtitle}</Heading>
                <MoonLoader size={30} color='#00FFFF' />
            </div>
        </div>
    );
};

export default AppRedirect;