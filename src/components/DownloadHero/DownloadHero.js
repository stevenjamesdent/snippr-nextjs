import classNames from 'classnames';
import clsx from 'clsx';

import Image from 'next/image';

import styles from './DownloadHero.module.scss';
import Content from '../Content/Content';
import AppStore from '../AppStore/AppStore';
import Social from '../Social/Social';
import Divider from '../Divider/Divider';

const snippr_img = require('../../assets/img/snippr-screens.png');
const snippr_biz_img = require('../../assets/img/snippr-biz-screens.png');

const DownloadHero = ({className, style, biz}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
        ['theme-snippr-dark']: !biz,
        ['theme-biz-dark']: biz,
    });

    const app_name = biz ? 'SNIPPR BIZ' : 'SNIPPR';
    const tagline = biz ? 'Ready to upgrade to a Snipper?' : 'Ready for the future of hair care?';
    
    return (
        <section className={class_names} style={style} data-banner>
            <div className='gutter flex max-tablet:flex-col-reverse gap-20 tablet:gap-gutter tablet:items-center justify-center'>
                <div className='basis-[500px]'>
                    <Content>
                        <h1>{tagline}</h1>
                        <h5 className='text-accent'><span className="text-accent">Download {app_name} Now</span></h5>
                        {
                            biz ?
                                <>
                                    <p>Are you ready to leave high chair rental prices, limited career progression, and creative restrictions in the past?</p>
                                    <p>From the salon chair to the driving seat - hairstylists everywhere are converting to Snippers, now it's your turn.</p>
                                </>
                            :
                                <>
                                    <p>Remember having to use the phone to book a taxi or order a takeaway? Yeah, we know, ancient history! Forget long waits, inconvenient appointment times, petrol and parking problems.</p>
                                    <p>SNIPPR is the future of hair care for all. Book convenient, comfortable, and cost-effective cuts - super fast.</p>
                                </>
                        }
                    </Content>
                    <Social minimal className='mt-5' />
                    <Divider className='my-10' />
                    <AppStore biz={biz} />
                </div>
                <Image
                    alt=""
                    height={800}
                    src={biz ? snippr_biz_img : snippr_img}
                    width={1000}
                    className='max-w-[40%]'
                />
            </div>
        </section>
    );
};

export default DownloadHero;