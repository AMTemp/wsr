/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APOD_URL: process.env.APOD_URL,
    APOD_KEY: process.env.APOD_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SENDGRID_KEY: process.env.SENDGRID_KEY,
    EMAIL_TO: process.env.EMAIL_TO,
    ENVIRONMENT: process.env.ENVIRONMENT
  },
  images: {
    domains: ['apod.nasa.gov', 'img.youtube.com', 'i.vimeocdn.com'],
    imageSizes: [320, 640, 1280, 1920]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
