export const getStaticHeaders = ctx => {
  const headers = {
    lng: ctx.lang,
    'store-key': process.env.STORE_KEY
  };
  return headers;
};
