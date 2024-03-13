import classNames from 'classnames';
import clsx from 'clsx';
import { MoonLoader } from 'react-spinners';

import styles from './Redirect.module.scss';

import Logo from '../Logo/Logo';

const Redirect = ({className, style, title = 'Redirecting, please wait...', target, error}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    return (
        <section className={class_names} style={style}>
            <div className={clsx(styles.message, 'gutter flex flex-col items-center basis-[600px]')}>
                <Logo scale={0.5} light />
                {
                    error ? <h1 className='text-red-light font-medium mt-5'>Oops! Something went wrong...</h1>
                    : title && <h1 className='text-white font-medium mt-5'>{title}</h1>
                }
                {!error &&
                    <div className='text-white opacity-80 font-extralight mt-2'>
                        If you're not redirected automatically, please follow <a className="text-cyan-light underline" href={target}>this link</a>.
                    </div>
                }
                {
                    error ?
                        <div className='text-white font-extralight mt-2'>
                            Sorry about that, please try refreshing your browser. If the error persists, please contact support via <a className="text-cyan-light underline" href="mailto:contact@snippr.co.uk">contact@snippr.co.uk</a>.
                        </div>
                    :
                        <MoonLoader className='mt-5' size={25} color='#00FFFF' />
                }
            </div>
        </section>
    );
};

export default Redirect;