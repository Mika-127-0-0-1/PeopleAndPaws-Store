/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    },

    experimental: {
        cpus: 1
    }
};

export default nextConfig;