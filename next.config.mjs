/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://ik.imagekit.io/**')],
    },
};

export default nextConfig;
