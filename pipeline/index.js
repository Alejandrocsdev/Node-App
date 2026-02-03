const createMiddleware = require('./middleware');
const createRouter = require('./router');

const createPipeline = () => {
  const stack = [];

  // Initialized once, reused across all requests
  const middleware = createMiddleware(stack);
  const router = createRouter(stack);

  // Execute pipeline
  const pipeline = (req, res, out) => {
    let index = 0;

    const next = (error) => {
      // Stop pipeline if the response has already been sent
      if (res.writableEnded) return;

      const layer = stack[index++];

      // No more layers to process
      if (!layer) {
        // Delegate to parent pipeline if mounted; otherwise end at app level.
        if (out) return out(error);

        // Send generic 500 for unhandled framework-level errors
        if (error && !res.writableEnded) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }

        // Stop pipeline execution
        return;
      }

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
