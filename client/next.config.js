const routes = require('./routes.json');

module.exports = {
  distDir: 'dist',
  async rewrites() {
    const result = [];

    routes.forEach((r) => {
      r.trans.forEach((t) => {
        result.push({ destination: `/${t.lang}${r.destination}`, source: t.source });
      });
    });

    console.log(result);
    return result;
  },
  env: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
    STORE_KEY: process.env.STORE_KEY,
    DOMAIN: process.env.DOMAIN
  }
};
