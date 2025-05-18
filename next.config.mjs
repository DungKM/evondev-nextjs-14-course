/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'bnda27dg0u.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // Thêm dòng này để cho phép ảnh từ utfs.io
      },
    ],
  },
};

export default nextConfig;
