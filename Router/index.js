const createPipeline = require('../pipeline');

// ============================================================
// ROUTER FACTORY
//
// Creates a router instance backed by its own pipeline.
// Acts as a child pipeline when mounted.
// ============================================================

const Router = () => {
  // Each router owns an independent pipeline instance
  const pipeline = createPipeline();

  // Router is a callable middleware function.
  // It delegates request handling to its internal pipeline.
  const router = (req, res, next) => {
    pipeline(req, res, next);
  };

	// Expose middleware registration (router.use)
  router.use = pipeline.middleware.use;

	// Expose route registration (router.get, router.post, ...)
  router.get = pipeline.router.get;
  router.post = pipeline.router.post;
  router.put = pipeline.router.put;
  router.patch = pipeline.router.patch;
  router.delete = pipeline.router.delete;

  return router;
};

module.exports = Router;
