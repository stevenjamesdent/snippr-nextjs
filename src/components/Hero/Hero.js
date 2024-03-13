import classNames from 'classnames';

import styles from './Hero.module.scss';

import Button from '../Button/Button';
import Content from '../Content/Content';
import Heading from '../Heading/Heading';

const Hero = ({className, style, title, subtitle, children}) => {
    const class_names = classNames(styles.hero, {
        [className]: className,
    });

    return (
        <section style={style} className={class_names}>
            <div className={styles.content}>
                <Heading className='h-mb-0 h-mt-0' tag='h1' giga center>{title}</Heading>
                <Heading className='h-mb-0' tag='h2' as='h5' center>{subtitle}</Heading>
                <Content className='h-mt-l h-mb-l' center>
                    {children}
                </Content>
                {/* <div className='h-d-f h-jc-c h-fw@mobile-down h-fd-c@mobile-down h-ai-c@mobile-down'>
                    <Button title='Get a Snip' theme='secondary' className='h-mr-l@mobile-up h-mb-l@mobile-down' />
                    <Button title='Become a Snipper' />
                </div> */}
            </div>
        </section>
    );
};

export default Hero;