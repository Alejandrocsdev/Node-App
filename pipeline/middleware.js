const createMiddleware = (stack) => {
  const use = (handler) => {
    stack.push({
      type: 'middleware',
      arity: handler.length,
      handler,
    });
  };

  const run = ({ layer, req, res, next, error }) => {
    const { arity, handler } = layer;

    // 1. Has error → handle
    if (arity === 4 && error) {
      return handler(error, req, res, next);
    }

    // 2. No error → skip & forward
    if (arity === 4) {
      return next();
    }

    // 3. Has error → skip & forward
    if (arity === 3 && error) {
      return next(error);
    }

    // 4. No error → handle
    if (arity === 3) {
      return handler(req, res, next);
    }
  };

  return { use, run };
};

module.exports = createMiddleware;
