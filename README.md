# Moraweb dashboard

available here: https://app.mora.u-szeged.hu

staging: https://morapp.netlify.app

This project aims to unify moraweb's services and provide a single entry point for users.

## Table of Contents

- [Getting Started](#getting_started)
- [Contributing](../CONTRIBUTING.md)

## Getting Started <a name = "getting_started"></a>

The project can be deployed on your own machine, however most of the internal API-s use [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to prevent unknown origins from using them.

### Prerequisites

This project is built with [SvelteKit](https://kit.svelte.dev/), which runs on [nodejs](https://nodejs.org/en/)

#### Getting the source code

```
git clone https://github.com/moraszk/moraweb.git
cd moraweb
```

### Installing

To start the server, simply run the following commands

```
npm install
npm run build
npm run preview
```

That's all

## Contributing

Have an awesome idea, want to get involved in the development or just provide feedback?

Create an [issue](https://github.com/moraszk/moraweb/issues/new) or contact us personally.

---

Made with ❤️ by [@moraszk](https://github.com/moraszk)
