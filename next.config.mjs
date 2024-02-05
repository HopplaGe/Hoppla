import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
    },
};

export default withNextIntl(nextConfig);
