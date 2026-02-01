const createMiddleware = () => {
	// Middleware registry
  const middlewares = [];

	// Execute middleware pipeline
  const middleware = (req, res, router) => {
    let index = 0;

    const next = () => {
      const fn = middlewares[index++];
      if (fn) {
				// Execute current middleware function
        return fn(req, res, next);
      }
			// No middleware left, dispatch to router
      return router(req, res);
    };

    next();
  };

	// Register middleware functions
  middleware.use = (fn) => {
    middlewares.push(fn);
  };

  return middleware;
};

module.exports = createMiddleware;
