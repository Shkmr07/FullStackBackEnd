const expireTime = (expire) => {
    const time = expire.slice(-1);
    const value = parseInt(expire, 10);
    switch (time) {
      case "d":
        return value * 24 * 60 * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "m":
        return value * 60 * 1000;
      default:
        return isNaN(value) ? 0 : value * 1000;
    }
  };

module.exports = expireTime