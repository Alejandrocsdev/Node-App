const { Buffer } = require('buffer');

const response = (res) => {
  res.status = (code) => {
    res.statusCode = code;
		// Returns the response object to enable chaining
    return res;
  };

  res.json = (data) => {
    const body = JSON.stringify(data);

    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Length', Buffer.byteLength(body));
    }

		// After write(), res.headersSent becomes true
    res.write(body);
    res.end();
  };
};

module.exports = response;
