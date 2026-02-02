const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const createRouter = (stack) => {
  const router = {};

  methods.forEach((method) => {
    router[method.toLowerCase()] = (path, handler) => {
      stack.push({
        type: 'route',
        arity: handler.length,
        match: (req) => req.method === method && req.path === path,
        handler,
      });
    };
  });

  const run = ({ layer, req, res, next, error }) => {
    const { match, arity, handler } = layer;

		// Skip this route if it does not match the request
    if (!match(req)) {
      return next(error);
    }

    // 1. Has error → skip & forward
    if (arity === 3 && error) {
      return next(error);
    }

    // 2. No error → handle
    if (arity === 3) {
      return handler(req, res, next);
    }

    // 3. Has error → skip & forward
    if (arity === 2 && error) {
      return next(error);
    }

    // 4. No error → handle
    if (arity === 2) {
      return handler(req, res);
    }
  };

  return { ...router, run };
};

module.exports = createRouter;
