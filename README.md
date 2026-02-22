# Node-App

> A minimal, dependency-free HTTP framework built using only Node.js built-in modules.

Node-App is a lightweight web framework created as a learning project to understand how frameworks like Express.js work under the hood. It implements core server functionality — routing, middleware pipelines, request/response helpers — without any external dependencies.

This project demonstrates low-level control over HTTP handling using Node’s native APIs.

---

## ✨ Why This Project Exists

Most developers use frameworks like Express without fully understanding how they work internally.

Node-App was built to:

- Learn HTTP fundamentals
- Understand middleware architecture
- Explore routing mechanics
- Practice building production-style abstractions from scratch

---

## 🚀 Features (Current)

### - Dependency-Free Core

Built entirely with Node.js built-in modules:

- `http`
- `url`
- `buffer`

No npm packages required.

---

### - HTTP Server Wrapper

Provides an Express-like `app.listen()` interface:

```js
const nodeApp = require('../Node-App');

const app = nodeApp();

app.listen(3000, () => console.info('Server running'));
```

Internally creates a native HTTP server.

---

### - Middleware System

Supports mountable middleware with prefix matching:

```js
app.use((req, res, next) => {
  next();
});
```

Features:

- Ordered execution pipeline
- Path prefix mounting
- Error-handling middleware support
- Nested middleware stacks
- Express-style `next()` flow control

---

### - Router Instances

Create modular routers that can be mounted into the main app.

```js
const { Router } = require('../../Node-App');
const router = Router();

const usersController = require('../controllers/user.controller');

router.get('/', usersController.getUsers);

module.exports = router;

app.use('/api', router);
```

Each router maintains its own independent pipeline.

---

### - Route Handling

Supports HTTP methods:

- GET
- POST
- PUT
- PATCH
- DELETE

Example:

```js
app.get('/', (req, res) => res.json({ status: 'ok' }));
```

---

### - Middleware Pipeline Engine

Implements a layered execution stack that processes:

- Middleware
- Routes
- Error handlers

Supports Express-style error flow:

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

### - Request Enhancements

Automatically parses request path:

```js
req.path
```

Uses the WHATWG URL API internally.

---

### - Response Helpers

Provides convenient response methods:

#### `res.status(code)`

```js
res.status(404);
```

#### `res.json(data)`

```js
res.json({ message: 'Hello' });
```

Automatically sets:

- Content-Type
- Content-Length
- Proper JSON serialization

---

## 🔮 Planned Features

Node-App will gradually evolve to include Express-like built-in functionality:

- JSON body parser (similar to `express.json()`)
- Static file serving (like `express.static()`)
- Query parsing utilities
- Cookie parsing
- Improved routing features
- Async middleware support
- Performance optimizations

The goal is educational — not to replace Express, but to deeply understand how such frameworks are built.

---

## 🎯 Interview Value

This project demonstrates:

✅ Deep understanding of Node.js HTTP internals  
✅ Middleware architecture knowledge  
✅ Routing design skills  
✅ Clean modular engineering  
✅ Ability to build frameworks from scratch  
✅ System design thinking  
✅ No dependency reliance  

---

## 📚 Learning Outcome

By building this framework, you gain insight into:

- How Express actually processes requests
- How middleware chaining works
- How routers isolate logic
- How HTTP responses are constructed
- How error handling flows through a pipeline
- How production frameworks are architected

---

## 📄 License

MIT License

---

## 👤 Author

Built as a learning project by Alex Chen.
