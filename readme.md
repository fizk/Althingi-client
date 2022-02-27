# althingi-client

React app and Apache.

## Docker and build.
The Dockerfile for this repo is a multistage build.
First an images is built from a NodeJS images, all the React dependencies are pulled in and a production-ready `bundle.js` file is created along with the required `css`, `html` files as well.

Next an Apache image is build that configures Apache for production, next the assets from the previous build are copied into the WebServer images.

The Docker container that gets shipped to production therefor doesn't have Node installed or any of the original TypeScript files.

## Developments.
This repo doesn't have a Docker container for development per se. There is a `run` service is **docker-compose.yaml** that mounts compiled TS files into a running Apache and that web-server can be used for development.

For development however, all pre-compile has to happen on the host machine. To get an environment up and running for development, simply run the classic

```sh
$ npm i
$ npm run build.dev
```

...and then use what ever web-server you see fit. I'm using VisualStudioCode's Live Server
