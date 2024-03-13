import clsx from "clsx";

import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ className, children, style, settings }) => {
    return (
        <div className={clsx('page min-h-screen flex flex-col', className)} style={style}>
            {settings && <Navigation items={settings?.nav_items} cta={settings?.nav_cta} />}

            <div className='flex-grow bg-white flex flex-col'>
                {children}
            </div>

            {settings &&
                <Footer
                    biz={settings?.footer_menu_snippr_biz}
                    footnote={settings?.footer_footnote}
                    snippr={settings?.footer_menu_snippr}
                />
            }
        </div>
    );
};

export default Layout;