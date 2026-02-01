const http = require('http');
const createApp = require('./app');

const nodeApp = () => {
	// Create the application (HTTP request listener)
  const app = createApp();

  app.listen = (port, callback) => {
		// Create an HTTP server (TCP-based)
    const server = http.createServer(app);
    return server.listen(port, callback);
  };

  return app;
};

module.exports = nodeApp;
