
![Poster](https://ravikisha.github.io/assets/livelywatch.png)

# ⚡ LivelyWatch

**LivelyWatch** is a blazing-fast live-reload development server written in TypeScript.  
It watches your static files, injects live-reload scripts into your HTML, and refreshes the browser automatically when changes are detected. Ideal for static site development, component previews, or SPA prototyping.

<p float="left">
<img src="https://img.shields.io/npm/v/livelywatch?color=blue" alt="npm version">
<img src="https://img.shields.io/npm/dt/livelywatch?color=green" alt="npm downloads">
<img src="https://img.shields.io/github/license/Ravikisha/LivelyWatch?color=orange" alt="license">
<img src="https://img.shields.io/github/stars/Ravikisha/LivelyWatch?color=yellow" alt="GitHub stars">
<img src="https://img.shields.io/github/issues/Ravikisha/LivelyWatch?color=red" alt="GitHub issues">

<br>
<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="TypeScript">
<img src="https://shields.io/badge/Node.js-339933?logo=Node.js&logoColor=FFF&style=flat-square" alt="Node.js">
<img src="https://shields.io/badge/JavaScript-FFCA28?logo=JavaScript&logoColor=000&style=flat-square" alt="JavaScript">
  </p>

---

## 🚀 Features

- ✅ Live-reload for HTML, JS, images, etc.
- 🎯 Hot-injecting CSS without full reload
- 📂 Serves static files from any directory
- 🌐 SPA (Single Page Application) fallback
- 🔧 Proxy API routes during development
- 🔒 HTTPS support with custom or default certs
- 🧪 Written in TypeScript for type safety and clarity

---

## 📦 Installation

### Global Install (recommended)

```bash
npm install -g livelywatch
```

Now you can run it using:

```bash
livelywatch [options]
```

### OR via npx (no install needed)

```bash
npx livelywatch [options]
```

---

## 🖥️ Usage

### Start server in current directory:

```bash
livelywatch
```

### Open browser on launch:

```bash
livelywatch --open
```

### Specify root directory:

```bash
livelywatch --root ./dist
```

### Use SPA mode (fallback to `index.html`):

```bash
livelywatch --spa --entry index.html
```

### Watch specific files only:

```bash
livelywatch --watch "src/**/*.{html,css,js}"
```

### Inject CSS without page reload:

```bash
livelywatch --css-inject
```

### Proxy API requests:

```bash
livelywatch --proxy "/api=http://localhost:4000"
```

### Enable HTTPS:

```bash
livelywatch --https --cert ./cert.pem --key ./key.pem
```

---

## 🔧 All CLI Options

| Option         | Alias | Description                                            | Default       |
| -------------- | ----- | ------------------------------------------------------ | ------------- |
| `--port`       | `-p`  | Port to run the server on                              | `3000`        |
| `--host`       | `-h`  | Host to bind the server to                             | `localhost`   |
| `--root`       | `-r`  | Root directory to serve                                | `.`           |
| `--open`       | `-o`  | Automatically open in default browser                  | `false`       |
| `--spa`        |       | Enable SPA mode (serves entry file for unknown routes) | `false`       |
| `--entry`      | `-e`  | SPA entry file (used with `--spa`)                     | `index.html`  |
| `--watch`      | `-w`  | Glob pattern(s) to watch for changes                   | `"**/*"`      |
| `--ignore`     |       | Glob pattern(s) to ignore                              |               |
| `--css-inject` |       | Hot-reload CSS without full refresh                    | `false`       |
| `--https`      |       | Enable HTTPS with default or custom certificates       | `false`       |
| `--cert`       |       | Path to SSL certificate                                | (optional)    |
| `--key`        |       | Path to SSL private key                                | (optional)    |
| `--proxy`      |       | Proxy rule: `/api=http://localhost:5000`               | (multiple ok) |
| `--quiet`      |       | Suppress logging                                       | `false`       |
| `--help`       |       | Show usage help                                        |               |

---

## 📘 User Manual

### 1. Starting the server

Start from your current working directory:

```bash
livelywatch
```

You can also serve a different folder:

```bash
livelywatch --root ./public
```

---

### 2. Watching files

By default, LivelyWatch watches everything inside `--root`.
To target specific files:

```bash
livelywatch --watch "src/**/*.{html,css,js}"
```

To ignore some paths:

```bash
livelywatch --ignore "node_modules/**"
```

---

### 3. CSS Injection

Enable CSS injection to avoid full page reloads when only CSS changes:

```bash
livelywatch --css-inject
```

When `.css` files change, only the `<link>` tags are reloaded in-place.

---

### 4. Single Page App (SPA) mode

If you're working on a React, Vue, or other SPA app:

```bash
livelywatch --spa --entry index.html
```

This means:

* All 404s fallback to `index.html`
* Works with frontend routers like React Router

---

### 5. Proxy API routes

You can forward backend requests during development:

```bash
livelywatch --proxy "/api=http://localhost:4000"
```

Multiple proxies are supported:

```bash
livelywatch \
  --proxy "/api=http://localhost:4000" \
  --proxy "/auth=http://localhost:3001"
```

---

### 6. HTTPS support

```bash
livelywatch --https
```

Optionally provide your own SSL cert and key:

```bash
livelywatch --https --cert ./cert.pem --key ./key.pem
```

---

## 📸 Example Dev Setup

```bash
livelywatch \
  --root ./build \
  --open \
  --watch "**/*.{html,js,css}" \
  --css-inject \
  --spa --entry index.html \
  --proxy "/api=http://localhost:5000"
```

---

## 🧪 Dev Scripts

```bash
npm run dev       # Live reload TypeScript build
npm run build     # Bundle to dist/
npm run lint      # Fix lint errors
npm run format    # Format code using Prettier
npm run typecheck # Run tsc without emit
```

---

## 🤝 Contributing

Pull requests and ideas are welcome!
Please [open an issue](https://github.com/Ravikisha/LivelyWatch/issues) to suggest improvements or report bugs.

---

## 📜 License

MIT © 2025 Ravi Kishan

---