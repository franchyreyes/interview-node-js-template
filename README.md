# Interview-node-js-template

## Overview

Simple Express-based Customer CRUD API with PostgreSQL persistence.
This repository shows a small but complete separation of concerns: routes,
controllers, services, repositories, validation middleware and mappers.

The app includes OpenAPI (Swagger) docs and unit tests for repository code.

## Technologies Used

- Node.js (ES Modules)
- Express
- PostgreSQL (`pg`)
- express-validator
- dotenv
- swagger-jsdoc + swagger-ui-express
- nodemon (dev)
- Jest (dev) for unit tests
- Babel (dev) to support ES module testing (`@babel/*`, `babel-jest`)

## Features

- CRUD for Customer (create, read all, read by id, delete)
- Request validation middleware
- Centralized error handler
- Swagger/OpenAPI documentation at `/api-docs`
- Unit test example mocking the DB for the repository

## Project structure (relevant files)

- `index.js` — application entrypoint and Swagger setup
- `src/route/customerRoute.js` — route definitions
- `src/controllers/customerController.js` — controllers
- `src/services/customerService.js` — business logic
- `src/repository/customerRepository.js` — DB queries (uses `src/config/db.js`)
- `src/config/db.js` — database client wrapper
- `src/middlewares/customerValidator.js` — request validation
- `src/middlewares/errorHandler.js` — centralized error handler
- `src/mappers/CustomerMapper.js` — mapping DTO/entity
- `src/utils/apiResponse.js` — response helpers
- `src/repository/__tests__/customerRepository.test.js` — Jest tests for repository
- `babel.config.cjs` — Babel config used by `babel-jest`

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Docker & Docker Compose (optional — for PostgreSQL)

## Environment variables

Create a `.env` file at project root with the DB connection values (example):

```env
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=mydatabase
DB_HOST=localhost
DB_PORT=5332
DB_PORT_PSQL=5332
```

Note: In this repo a local Docker Compose may map Postgres container port to
host port `5332` (check `docker-compose.yml`). The app's `src/config/db.js` reads
connection details from the environment.

## How to run (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start PostgreSQL (optional — use Docker Compose if you don't have Postgres locally)

```powershell
# start Postgres and any other services defined in docker-compose.yml
docker compose -f docker-compose.yml -p demo up -d
```

3. Ensure `.env` is configured (see above) and then start the app in development:

```powershell
# start with nodemon + babel-node as configured in package.json
npm start
```

4. The server listens on port `3000` by default.

Open API docs:

http://localhost:3000/api-docs

Customer routes are mounted under `/customers` (see `index.js`).

## Tests

This project uses Jest with `babel-jest` to support ES module imports in tests.
There is an example test that mocks `src/config/db.js`:

- `src/repository/__tests__/customerRepository.test.js`

Run tests:

```powershell
npm test
```

If you haven't installed dependencies yet, run `npm install` first. The `test`
script runs `jest` as configured in `package.json`.

## Development tips

- The repository layer uses `src/config/db.js` which exports a `query` method —
	tests mock this module to avoid connecting to a real database.
- Add more tests under `src/**/__tests__` following the example layout.

## Docker notes

- Check `docker-compose.yml` in the repo root to see the Postgres service and port
	mappings. If Postgres is mapped to host port `5332`, use `DB_PORT=5332` in `.env`.
- You can run the whole stack with:

```powershell
docker compose -f docker-compose.yml -p demo up -d --build
```

## API Quick commands (PowerShell)

Install deps:

```powershell
npm install
```

Run app:

```powershell
npm start
```

Run tests:

```powershell
npm test
```

Bring up Docker services:

```powershell
docker compose -f docker-compose.yml -p demo up -d --build
```

## Notes & next steps

- I kept the OpenAPI path and server port(s) consistent with the existing
	`index.js` (port `3000` and `/api-docs`). If you want a different port, update
	`index.js` or add a `PORT` environment variable and we can wire it in.
- I added Jest and an example repository test that mocks the DB; if you'd like I
	can add integration tests that run against the Docker Postgres instance.

If you want, I can now:

- add an npm `test:watch` script or enhance `package.json` scripts,
- add an integration test setup using `docker-compose.test.yml`, or
- add a GitHub Actions workflow that runs the tests on each PR.

Tell me which of those you'd like next and I'll implement it.
