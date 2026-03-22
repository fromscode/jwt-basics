const currentTimeInSeconds = Math.floor(Date.now() / 1000);

export default {
  sub: "21",
  name: "Sonny Hayes",
  role: "driver",
  iat: currentTimeInSeconds,
  exp: currentTimeInSeconds + 24 * 60 * 60,
};
