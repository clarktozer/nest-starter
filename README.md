<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</div>

<h3 align="center">NestJS Starter Pack</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## Features

- Local Auth
- Google Auth
- Facebook Auth
- LinkedIn Auth
- Redis for sessions
- CSRF session tokens
- CASL for authorization
- TypeORM (PostgreSQL)
- Swagger docs

## Installation

```bash
$ git clone the repo
$ npm install
```

You will also need to create your database.

## Environment Variables

The values included are defaults if the variable is not specified.

```bash
APP_HOST=localhost
APP_PORT=3000
API_PREFIX=api

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=5432

SESSION_COOKIE_KEY=sid
SESSION_SECRET=secret

CSRF_COOKIE_KEY=csrf
CSRF_SESSION_KEY=csrfSecret

REDIS_HOST=localhost
REDIS_PORT=6379

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_CALLBACK_URL=

LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_CALLBACK_URL=
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
