/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheComponents: false,
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
