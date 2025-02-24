# New Relic Instrumentation

This branch contains code for New Relic instrumentation.

CubeAPM works with New Relic agents as described in [using CubeAPM with New Relic agents](https://docs.cubeapm.com/instrumentation#using-cubeapm-with-new-relic-agents).

For testing, **ngrok** can be used in place of load balancer. Run `ngrok http 3130` to create a tunnel and use the domain name provided by ngrok to set `NEW_RELIC_HOST=xxxx.ngrok-free.app` in [docker-compose.yml](docker-compose.yml).

Refer the project README below for more details.

---

# NodeJS NestJS Instrumentation

This is a sample app to demonstrate how to instrument NodeJS NestJS app with **New Relic** and **OpenTelemetry**. It contains source code for the NestJS app which interacts with various services like Redis, MySQL, etc. to demonstrate tracing for these services. This repository has a docker compose file to set up all these services conveniently.

The code is organized into multiple branches. The main branch has the NestJS app without any instrumentation. Other branches then build upon the main branch to add specific instrumentations as below:

| Branch                                                                                         | Instrumentation | Code changes for instrumentation                                                                                |
| ---------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| [main](https://github.com/cubeapm/sample_app_nodejs_nest/tree/main)         | None            | -                                                                                                               |
| [newrelic](https://github.com/cubeapm/sample_app_nodejs_nest/tree/newrelic) | New Relic       | [main...newrelic](https://github.com/cubeapm/sample_app_nodejs_nest/compare/main...newrelic) |
| [otel](https://github.com/cubeapm/sample_app_nodejs_nest/tree/otel)         | OpenTelemetry   | [main...otel](https://github.com/cubeapm/sample_app_nodejs_nest/compare/main...otel)         |

## Setup

Clone this repository and go to the project directory. Then run the following commands

```
npm install
docker compose up --build
```

NestJS app will now be available at `http://localhost:3000`.

The app has various API endpoints to demonstrate integrations with Redis, MySQL, etc. Check out [src/app.controller.ts](src/app.controller.ts) for the list of API endpoints.

## Running without Docker

The app can be run with the following command

```
export NEW_RELIC_HOST=<domain_of_cubeapm_server>
export NODE_OPTIONS="--require newrelic"
export NEW_RELIC_APP_NAME=cube_sample_nodejs_nest_newrelic
export NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
npm run start
```

# Contributing

Please feel free to raise PR for any enhancements - additional service integrations, library version updates, documentation updates, etc.
