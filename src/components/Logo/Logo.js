import styles from './Logo.module.scss';

import biz_dark from './assets/logo_biz_dark.svg';
import biz_light from './assets/logo_biz_light.svg';
import standard_dark from './assets/logo_dark.svg';
import standard_light from './assets/logo_light.svg';

const Logo = ({ light = false, biz = false, scale = 1 }) => {
    const LogoSvg = biz ? (light ? biz_light : biz_dark) : (light ? standard_light : standard_dark);
    const base_logo_width = 200;
    const base_logo_height = 60;

    return (
        <LogoSvg
            height={base_logo_height * scale}
            width={base_logo_width * (biz ? (scale * 1.5) : scale)}
        />
    );
};

export default Logo;