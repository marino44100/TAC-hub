/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimize for Vercel deployment
    output: 'standalone',

    // Image optimization
    images: {
        domains: ['theafricanclimatehub.com', 'images.unsplash.com', 'unsplash.com'],
        unoptimized: false,
        formats: ['image/webp', 'image/avif'],
    },

    // Enable compression and optimization
    compress: true,
    swcMinify: true,

    // Experimental optimizations
    experimental: {
        optimizePackageImports: ['lucide-react', 'recharts'],
    },

    // Security and performance headers
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin',
                },
            ],
        }, ]
    },

    // Environment variables
    env: {
        CUSTOM_KEY: 'tac-hub-production',
    },

    // Webpack optimization for better bundle size
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        }

        return config
    },
}

module.exports = nextConfig