export const getStaticHeaders = ctx => {
  const headers = {
    lng: ctx.lang,
    store_key: process.env.STORE_KEY
  };
  return headers;
};
