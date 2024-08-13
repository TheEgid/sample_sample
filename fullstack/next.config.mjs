
export default {
    distDir: "build",
    reactStrictMode: true,
    onDemandEntries: { maxInactiveAge: 25 * 10000 },
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            },
        ],
    }
};
