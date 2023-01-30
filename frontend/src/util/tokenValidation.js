export const accessTokenValidate = (param) => {
  const accessValid = param.data.code === 1;
  const accessExpired = param.data.code === 2;
  const accessInvalid = param.data.code === -1;
  return { accessValid, accessExpired, accessInvalid };
};

export const refreshTokenValidate = (param) => {
  const refreshValid = param.data.code === 1;
  const refreshExpired = param.data.code === 2;
  const refreshInvalid = param.data.code === -1;
  return { refreshValid, refreshExpired, refreshInvalid };
};

export const newAccessTokenValidate = (param) => {
  const newAccessValid = param.data.code === 1;
  const newAccessExpired = param.data.code === 2;
  const newAccessInvalid = param.data.code === -1;
  return {
    newAccessValid,
    newAccessExpired,
    newAccessInvalid,
  };
};
