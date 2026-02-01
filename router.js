const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const createRouter = () => {
  // Route registry
  const routes = [];

  // Route dispatcher
  const router = (req, res) => {
    for (const route of routes) {
      if (route.method === req.method && route.path === req.path) {
        return route.handler(req, res);
      }
    }
		
    // No matching route found
    res.statusCode = 404;
    res.end(`Cannot ${req.method} ${req.path}`);
  };

  // Register route handlers by HTTP method
  methods.forEach((method) => {
    router[method.toLowerCase()] = (path, handler) => {
      routes.push({ method, path, handler });
    };
  });

  return router;
};

module.exports = createRouter;
