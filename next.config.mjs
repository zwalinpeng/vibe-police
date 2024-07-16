/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.scdn.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
