import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import classNames from 'classnames';
import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './Accordion.module.scss';

const Accordion = ({className, style, children, activeByDefault = false, title}) => {
    const [active, set_active] = useState(activeByDefault);

    const class_names = classNames(styles.accordion, {
        [className]: className,
        [styles.accordion_active]: active,
    });

    return (
        <div className={class_names} style={style}>
            <div className={clsx(styles.header, 'flex gap-5 items-center justify-between')} onClick={() => set_active((current) => !current)}>
                <div className='text-large font-semibold'>{title}</div>
                {
                    active
                        ? <ChevronUpIcon className='flex-shrink-0' width={30} height={30} />
                        : <ChevronDownIcon className='flex-shrink-0' width={30} height={30} />
                }
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;