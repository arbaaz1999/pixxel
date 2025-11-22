/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [new URL('https://ik.imagekit.io/**')],
    },
};

export default nextConfig;
