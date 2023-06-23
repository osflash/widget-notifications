/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ipfs',
        destination: '/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
