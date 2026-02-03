const createMiddleware = (stack) => {
  const use = (prefix, handler) => {
    if (typeof prefix === 'function') {
      handler = prefix;
      prefix = '/';
    }

    stack.push({
      type: 'middleware',
      arity: handler.length,
      prefix,
      handler,
    });
  };

  const run = ({ layer, req, res, next, error }) => {
    const { prefix, arity, handler } = layer;

    // Skip middleware if path does not match prefix
    if (!req.path.startsWith(prefix)) {
      // next(error) here does not decide error vs normal flow
      return next(error);
    }

    // Save original path and remove the mounted prefix from req.path
    const originalPath = req.path;
    req.path = req.path.slice(prefix.length) || '/';

    // Reset path to original
    const resetPath = () => (req.path = originalPath);

    // ============================================================
    // CONTROL-FLOW DECISION POINT
    //
    // - Use next()        → explicitly continue in normal flow
    // - Use next(error)   → explicitly continue in error flow
    //
    // Everywhere else, next(value) is used ONLY to forward the
    // existing pipeline state; it does NOT decide control flow.
    // ============================================================

    // 1. Has error → handle
    if (arity === 4 && error) {
      return handler(error, req, res, (value) => {
        resetPath();
        next(value);
      });
    }

    // 2. No error → skip & forward
    if (arity === 4) {
      resetPath();
      return next();
    }

    // 3. Has error → skip & forward
    if (arity === 3 && error) {
      resetPath();
      return next(error);
    }

    // 4. No error → handle
    if (arity === 3) {
      return handler(req, res, (value) => {
        resetPath();
        next(value);
      });
    }
  };

  return { use, run };
};

module.exports = createMiddleware;
