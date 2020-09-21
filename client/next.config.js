module.exports = {
  distDir: 'dist',
  async rewrites() {
    return [
      {
        source: '/es/marcas',
        destination: '/es/brands'
      },
      {
        source: '/gl/marcas',
        destination: '/gl/brands'
      },
      {
        source: '/es/marcas/:slug*',
        destination: '/es/brands/:slug*'
      },
      {
        source: '/gl/marcas/:slug*',
        destination: '/gl/brands/:slug*'
      }
    ];
  },
  env: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT
  }
};
