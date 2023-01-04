const getGenerateRandomKey = function () {
  return Math.random().toString(36).substring(2, 16);
};

export default getGenerateRandomKey;
