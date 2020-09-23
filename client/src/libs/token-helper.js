let accessToken = '';

export const setAccessToken = (value) => {
  accessToken = value;
};

export const getAccessToken = () => {
  // Check if accessToken is expired

  return accessToken && accessToken !== '' ? `Bearer ${accessToken}` : '';
};
