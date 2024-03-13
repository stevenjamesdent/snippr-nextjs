import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router'

import styles from './Navigation.module.scss';

import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import Offcanvas from '../Offcanvas/Offcanvas';
import { useCallback } from 'react';

const Navigation = ({ className, style, items, cta }) => {
    const [banner_exists, set_banner_exists] = useState(true);
    const [offcanvas_active, set_offcanvas_active] = useState(false);
    const [navbar_height, set_navbar_height] = useState(0);
    const [navbar_solid, set_navbar_solid] = useState(false);
    // const navbar_ref = useRef();

    const class_names = classNames(styles.navbar, {
        [className]: className,
        [styles.navbar_solid]: navbar_solid || !banner_exists,
    });

    const router = useRouter();
    const nav_items = items?.map((item) => ({
        href: item.link.cached_url,
        title: item.name,
        target: '_self',
        active: router.asPath?.replace(/\//g, '') === item.link.cached_url?.replace(/\//g, '')
    })) ?? [];

    useEffect(() => {
        set_banner_exists(document.querySelector('[data-banner]') ?? false);
        handle_scroll();
        set_offcanvas_active(false);
    }, [router.asPath]);

    useEffect(() => {
        window.addEventListener("scroll", handle_scroll);
        return () => window.removeEventListener("scroll", handle_scroll);
    }, []);
    const update_height = (height) => {
        document.documentElement.style.setProperty('--navbar-height', `${height ?? 0}px`);
        set_navbar_height(height);
    }

    const handle_scroll = () => {
        set_navbar_solid(window.scrollY > 1);
    }

    const navbar_ref = useCallback(node => {
        if (!node) return;
        const resize_observer = new ResizeObserver(() => update_height(node.offsetHeight));
        resize_observer.observe(node);
    }, []);

    return (
        <>
            <header ref={navbar_ref} className={class_names} style={style}>
                <Link href='/'><Logo className scale={0.5} light /></Link>
                <nav className={styles.menu}>
                    <ul>
                        {
                            nav_items?.map((item, i) => (
                                <li key={'nav-item-' + i}>
                                    <Link
                                        className={clsx(styles.link, item.active && styles.link_active, 'flex')}
                                        href={item.href}
                                        target={item.target}
                                        title={item.title}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <nav className='max-laptop:ml-auto flex gap-10'>
                    {
                        cta?.length ?
                            <Link
                                className={clsx(styles.link, styles.cta, 'max-mobile:hidden')}
                                href={cta[0].link.cached_url}
                                title={cta[0].name}
                            >{cta[0].name}</Link>
                        : null
                    }

                    <Button
                        className='laptop:!hidden'
                        onClick={() => set_offcanvas_active(true)}
                        title='Open Menu'
                        unstyled
                    >
                        <HamburgerMenuIcon width={30} height={30} />
                    </Button>
                </nav>
            </header>

            <Offcanvas active={offcanvas_active} onDismiss={() => set_offcanvas_active(false)}>
                <Menu spaced>
                    {
                        nav_items?.map((item, i) => (
                            <Menu.Item
                                active={item.active}
                                href={item.href}
                                key={'menu-item-' + i}
                                onClick={() => set_offcanvas_active(false)}
                                target={item.target}
                                title={item.title}
                            >
                                {item.title}
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Offcanvas>
        </>
    );
};

export default Navigation;