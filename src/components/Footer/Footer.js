import * as CONSTANTS from '@snippr/constants';

import classNames from 'classnames';
import Link from 'next/link';

import styles from './Footer.module.scss';

import Content from '../Content/Content';
import Heading from '../Heading/Heading';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

const FooterSection = ({className, style, title, children, large, mobile}) => {
    const class_names = classNames(styles.section, {
        [className]: className,
        [styles.section_large]: large,
        [styles.section_mobile]: mobile,
    });

    return (
        <div className={class_names} style={style}>
            {title && <Heading tag='h2' as='h3' className={styles.title}>{title}</Heading>}
            {children}
        </div>
    );
};

const Footer = ({className, style, snippr, biz, footnote}) => {
    const class_names = classNames(styles.footer, {
        [className]: className,
    });

    return (
        <footer className={class_names} style={style}>
            <div className={styles.body}>
                <FooterSection mobile large>
                    <Link href='/'><Logo className scale={0.5} light /></Link>
                    <Content className='mt-5'>
                        <p className='text-white'>
                            {
                                footnote ??
                                "SNIPPR is the future of hair care for all - whether you're a customer looking for convenience or a hair stylist ready for an upgrade."
                            }
                        </p>
                    </Content>
                </FooterSection>
                {snippr?.length &&
                    <FooterSection title='SNIPPR'>
                        <Menu spaced className='font-light'>
                            <Menu.Item href={CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR.GENERIC} title='Download Now' />
                            {
                                snippr.map((item, i) => (
                                    <Menu.Item
                                        href={item.link.cached_url}
                                        key={'footer-snippr-' + i}
                                        target={item.link.target ?? '_self'}
                                        title={item.name}
                                    />
                                ))
                            }
                        </Menu>
                    </FooterSection>
                }
                {biz?.length &&
                    <FooterSection title='SNIPPR BIZ'>
                        <Menu spaced className='font-light'>
                            <Menu.Item href={CONSTANTS.SETTINGS.URLS.APP_DOWNLOAD.SNIPPR_BIZ.GENERIC} title='Download Now' />
                            {
                                biz.map((item, i) => (
                                    <Menu.Item
                                        href={item.link.cached_url}
                                        key={'footer-biz-' + i}
                                        target={item.link.target ?? '_self'}
                                        title={item.name}
                                    />
                                ))
                            }
                        </Menu>
                    </FooterSection>
                }
                <FooterSection mobile title='Legal'>
                    <Menu spaced className='font-light'>
                        <Menu.Item href='https://www.iubenda.com/privacy-policy/78029071' title='Privacy Policy' target='_blank' />
                        <Menu.Item href='https://www.iubenda.com/privacy-policy/78029071/cookie-policy' title='Cookie Policy' target='_blank' />
                        <Menu.Item href='https://www.iubenda.com/terms-and-conditions/78029071' title='Terms & Conditions' target='_blank' />
                    </Menu>
                </FooterSection>
            </div>
            <Content className={styles.copyright}>
                <small>{CONSTANTS.BUSINESS.NOTICES.COMPANY_REG}</small>
                <small className={styles.copyright_small}>{CONSTANTS.BUSINESS.NOTICES.COPYRIGHT}</small>
            </Content>
        </footer>
    );
};

export default Footer;