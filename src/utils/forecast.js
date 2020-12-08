const request = require("request");
require('dotenv').config();

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/"+process.env.DARKSKY_KEY + "/" +
    longitude +
    "," +
    latitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.");
    } else if (body.error) {
      callback(body.error);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          "°C outside.\nThe temperature high for today is " +
          body.daily.data[0].temperatureHigh +
          "°C and the temperature low is " +
          body.daily.data[0].temperatureLow +
          "°C." +
          " There is currently a " +
          Math.round(body.currently.precipProbability * 100) +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
