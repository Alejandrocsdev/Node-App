const http = require('http');
const createApp = require('./app');
const Router = require('./Router');

const nodeApp = () => {
	// Create the application (HTTP request listener)
  const app = createApp();

  app.listen = (port, callback) => {
		// Create an HTTP server (TCP-based)
    const server = http.createServer(app);
    server.listen(port, callback);
		return server
  };

  return app;
};

module.exports = nodeApp;
module.exports.Router = Router;
