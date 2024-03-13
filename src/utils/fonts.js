import localFont from "next/font/local";

export const poppins = localFont({
    variable: '--font-poppins',
    preload: true,
    src: [
        {
            path: '../assets/fonts/poppins/Poppins-Thin.ttf',
            style: 'normal',
            weight: '100',
        },
        {
            path: '../assets/fonts/poppins/Poppins-ThinItalic.ttf',
            style: 'italic',
            weight: '100',
        },
        {
            path: '../assets/fonts/poppins/Poppins-ExtraLight.ttf',
            style: 'normal',
            weight: '200',
        },
        {
            path: '../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf',
            style: 'italic',
            weight: '200',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Light.ttf',
            style: 'normal',
            weight: '300',
        },
        {
            path: '../assets/fonts/poppins/Poppins-LightItalic.ttf',
            style: 'italic',
            weight: '300',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Regular.ttf',
            style: 'normal',
            weight: '400',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Italic.ttf',
            style: 'italic',
            weight: '400',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Medium.ttf',
            style: 'normal',
            weight: '500',
        },
        {
            path: '../assets/fonts/poppins/Poppins-MediumItalic.ttf',
            style: 'italic',
            weight: '500',
        },
        {
            path: '../assets/fonts/poppins/Poppins-SemiBold.ttf',
            style: 'normal',
            weight: '600',
        },
        {
            path: '../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf',
            style: 'italic',
            weight: '600',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Bold.ttf',
            style: 'normal',
            weight: '700',
        },
        {
            path: '../assets/fonts/poppins/Poppins-BoldItalic.ttf',
            style: 'italic',
            weight: '700',
        },
        {
            path: '../assets/fonts/poppins/Poppins-ExtraBold.ttf',
            style: 'normal',
            weight: '800',
        },
        {
            path: '../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf',
            style: 'italic',
            weight: '800',
        },
        {
            path: '../assets/fonts/poppins/Poppins-Black.ttf',
            style: 'normal',
            weight: '900',
        },
        {
            path: '../assets/fonts/poppins/Poppins-BlackItalic.ttf',
            style: 'italic',
            weight: '900',
        },
    ],
});

export const zing_base = localFont({
    variable: '--font-logo',
    preload: true,
    src: [
        {
            path: '../assets/fonts/zing/base.otf',
            style: 'italic',
            weight: 'normal',
        }
    ],
});

export const zing_script = localFont({
    variable: '--font-script',
    preload: true,
    src: [
        {
            path: '../assets/fonts/zing/script.otf',
            style: 'normal',
            weight: 'normal',
        }
    ],
});