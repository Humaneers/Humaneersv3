/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        cacheComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;
