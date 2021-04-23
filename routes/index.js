// Fetching the variable API_VERSION from the process environment
const API_VERSION = process.env.API_VERSION;

const rootRoute = require("./root");

module.exports = (app) => {
  // Root route. All API endpoints will be prefixed with api/{API_VERSION}
  app.use(`/api/${API_VERSION}`, rootRoute);
};
