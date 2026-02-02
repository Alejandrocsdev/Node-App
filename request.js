const { URL } = require('url');

const request = (req) => {
	// Host was optional in HTTP/1.0
	const host = req.headers.host || 'localhost';
  const url = new URL(req.url, `http://${host}`);
  req.path = url.pathname;
};

module.exports = request;
