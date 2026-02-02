const createMiddleware = require('./middleware');
const createRouter = require('./router');

const createPipeline = () => {
  const stack = [];

	// Initialized once, reused across all requests
  const middleware = createMiddleware(stack);
  const router = createRouter(stack);

  // Execute pipeline
  const pipeline = (req, res) => {
    let index = 0;

    const next = (error) => {
      if (res.writableEnded) return;

      const layer = stack[index++];
      if (!layer) return;

      const context = { layer, req, res, next, error };

      if (layer.type === 'middleware') {
        return middleware.run(context);
      }

      if (layer.type === 'route') {
        return router.run(context);
      }
    };

    next();
  };

  pipeline.middleware = middleware;
  pipeline.router = router;

  return pipeline;
};

module.exports = createPipeline;
