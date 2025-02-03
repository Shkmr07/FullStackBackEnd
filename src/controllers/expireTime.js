/**
 * The function `expireTime` converts a time value with a specified unit (d for days, h for hours, m
 * for minutes) into milliseconds.
 * @param expire - The `expireTime` function takes a string parameter `expire` that represents a time
 * duration with a unit suffix (e.g., "1d" for 1 day, "2h" for 2 hours, "30m" for 30 minutes). The
 * function parses this input to determine
 * @returns The `expireTime` function is being returned. This function takes a string input
 * representing a time duration with a specified unit (e.g., "1d" for 1 day, "2h" for 2 hours, "30m"
 * for 30 minutes) and converts it into milliseconds. The function parses the input string to extract
 * the numerical value and unit, then calculates the equivalent time
 */

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