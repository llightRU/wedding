/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGitHubPages ? '/Quang-Nhoong-Wedding' : '';

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath,
    assetPrefix: basePath,
    images: {
        unoptimized: true,
    },
    productionBrowserSourceMaps: false,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
};

module.exports = nextConfig;
