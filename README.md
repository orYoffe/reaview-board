# review-board

Filtered, infinite scroll list with api of advisors.

- The list is sorted by reviews count and online first by default.
- a new random list of advisors is created each time the server runs, so be aware that you probably won't find the same advisor each time you start the app
- The default number of advisors generated is 100, you can change this at `/api/endpoints.js` file.

## Install

In the root directory of the project, run:

```sh
npm install
```

## Start production server

If after installing you don't have a build folder in the root directory, please run:

```sh
npm run build
```

To start production server, run:

```sh
npm start
```

Then open your browser at [http://localhost:4000](http://localhost:4000)

## Start development webpack server and api server

Run:

```sh
npm run dev
```

will start the api and the frontend webpack server with reloading on update (for both).

Then open your browser at [http://localhost:3000](http://localhost:3000)

## Run tests

To run all the tests, run:

```sh
npm test
```

To run changed tests in watch mode, run:

```sh
npm run test-watch
```
