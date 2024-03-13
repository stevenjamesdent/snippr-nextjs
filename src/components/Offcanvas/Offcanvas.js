import classNames from 'classnames';
import { PinLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link';

import styles from './Offcanvas.module.scss';

import Button from '../Button/Button';
import Divider from '../Divider/Divider';
import Logo from '../Logo/Logo';

const Offcanvas = ({active, children, className, style, onDismiss}) => {
    const class_names = classNames(styles.offcanvas, {
        [styles.offcanvas_active]: active,
        [className]: className,
    });

    return (
        <aside style={style} className={class_names}>
            <div className='flex items-center justify-between p-10'>
                <Link onClick={onDismiss} href='/'><Logo className scale={0.5} light /></Link>
                <Button title='Dismiss Menu' onClick={onDismiss} unstyled>
                    <PinLeftIcon width={30} height={30} />
                </Button>
            </div>
            <Divider className='mb-10' />
            <div className='px-10'>
                {children}
            </div>
        </aside>
    );
};

export default Offcanvas;