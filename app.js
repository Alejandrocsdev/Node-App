const request = require('./request');
const response = require('./response');
const createPipeline = require('./pipeline');

const createApp = () => {
	// Initialized once, reused across all requests
  const pipeline = createPipeline();
  const { router, middleware } = pipeline;

  const app = (req, res) => {
    // Extend request and response objects (per request)
    request(req);
    response(res);
    // Execute request pipeline
    pipeline(req, res);
  };

  // Middleware registration
  app.use = middleware.use;

  // Route registration
  app.get = router.get;
  app.post = router.post;
  app.put = router.put;
  app.patch = router.patch;
  app.delete = router.delete;

  return app;
};

module.exports = createApp;
