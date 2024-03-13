/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        '@fancyapps/ui',
        '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js'
    ],
    images: {
        domains: [
            'a.storyblok.com',
            'images.pexels.com',
            'images.unsplash.com',
            'res.cloudinary.com',
        ],
    },
    
    async redirects() {
        return [
            {
                source: '/privacy-policy',
                destination: 'https://www.iubenda.com/privacy-policy/78029071',
                permanent: true,
            },
            {
                source: '/cookie-policy',
                destination: 'https://www.iubenda.com/privacy-policy/78029071/cookie-policy',
                permanent: true,
            },
            {
                source: '/terms-and-conditions',
                destination: 'https://www.iubenda.com/terms-and-conditions/78029071',
                permanent: true,
            },
        ]
    },

    webpack(config) {
        const file_loader_rule = config.module.rules.find((rule) =>
            rule.test?.test?.('svg'),
        )

        config.module.rules.push(
            {
                ...file_loader_rule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ },
                use: [{loader: '@svgr/webpack', options: {
                    dimensions: false,
                }}],
            }
        )

        return config;
    },
}

module.exports = nextConfig
