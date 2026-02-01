const { URL } = require('url');

const request = (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.path = url.pathname;
};

module.exports = request;
