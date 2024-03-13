import classNames from 'classnames';
import clsx from 'clsx';
import resolveConfig from 'tailwindcss/resolveConfig'
import { default as tailwind_config } from '@root/tailwind.config';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import styles from './DevTools.module.scss';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

const DevToolBreakpoint = ({className, style}) => {
    const [current_width, set_current_width] = useState(null);

    const class_names = classNames(styles.breakpoint, {
        [className]: className,
    });

    useEffect(() => {
        set_current_width(window.innerWidth)
        window.addEventListener("resize", () => set_current_width(window.innerWidth));
        return () => window.removeEventListener("resize", () => set_current_width(window.innerWidth));
    }, []);

    const { theme } = resolveConfig(tailwind_config);
    const breakpoints = Object.keys(theme.screens).map(
        (breakpoint_name, i) => ({ name: breakpoint_name, size: parseInt(theme.screens[breakpoint_name], 10) }
    ));

    const breakpoint_position = useMemo(() => {
        const upper = breakpoints.filter((bp) => bp.size > current_width ).map((bp) => bp.size);
        const lower = breakpoints.filter((bp) => bp.size < current_width ).map((bp) => bp.size);

        return {
            current: {
                name: breakpoints.find((bp) => bp.size === current_width)?.name ?? null,
                size: current_width
            },
            next: breakpoints.find((bp) => bp.size === Math.min(...upper)),
            prev: breakpoints.find((bp) => bp.size === Math.max(...lower)),
        };
    }, [current_width]);

    return (
        <div className={clsx(class_names, 'flex items-center gap-1 px-2')} style={style}>
            <div className='text-center text-white text-small py-1'>
                <div className='font-semibold'>{breakpoint_position.prev?.name ?? 'None'}</div>
                <div className='font-light text-xs'>({breakpoint_position.prev?.size ?? 'At Lowest BP'})</div>
            </div>
            <ChevronLeftIcon width={20} height={20} className='text-white' />
            <div className='text-center text-white text-small bg-green-900 px-2 py-1'>
                <div className='font-semibold'>{breakpoint_position.current.size}px</div>
                <div className='font-light text-xs'>({breakpoint_position.current.name ?? 'No Match'})</div>
            </div>
            <ChevronRightIcon width={20} height={20} className='text-white' />
            <div className='text-center text-white text-small py-1'>
                <div className='font-semibold'>{breakpoint_position.next?.name ?? 'None'}</div>
                <div className='font-light text-xs'>({breakpoint_position.next?.size ?? 'At Highest BP'})</div>
            </div>
        </div>
    );
};

const DevTools = ({className, style, children}) => {
    const class_names = classNames(styles.wrapper, {
        [className]: className,
    });

    return process.env.NODE_ENV === 'development' ? (
        <div className={class_names} style={style}>
            {children}
        </div>
    ) : null;
};

DevTools.Breakpoint = DevToolBreakpoint;

export default DevTools;