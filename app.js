const request = require('./request');
const response = require('./response');
const createMiddleware = require('./middleware');
const createRouter = require('./router');

const createApp = () => {
	const middleware = createMiddleware();
	const router = createRouter();

  const app = (req, res) => {
		// Extend request and response objects
    request(req);
    response(res);
		// Process middleware pipeline, then dispatch to router
		middleware(req, res, router)
  };

	// Register middleware functions
	app.use = middleware.use;

	// Register route handlers by HTTP method
	app.get = router.get;
	app.post = router.post;
	app.put = router.put;
	app.patch = router.patch;
	app.delete = router.delete;

  return app;
};

module.exports = createApp;
