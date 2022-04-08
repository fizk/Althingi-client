# althingi-client

React app and Apache.

## Docker and build.
The Dockerfile for this repo is a multistage build.
First an images is built from a NodeJS images, all the React dependencies are pulled in and a production-ready `bundle.js` file is created along with the required `css`, `html` files as well.

Next an Apache image is build that configures Apache for production, next the assets from the previous build are copied into the WebServer images.

The Docker container that gets shipped to production therefor doesn't have Node installed or any of the original TypeScript files.

## Developments.
This repo does come with a development Docker container. The `run` service in `docker-compose.yml` will spin up an environment, which is a running Apache that mounts the pre-compiled files into its htdocs folder.

This means how ever, that the host systems needs to pre-compile all assets. So in development, have NodeJS available and run:

```sh
$ npm i
$ npm run build.dev
```
before starting up development environment.

```sh
$ docker-compose up run
```
This will run the client and Thumbor (for images). It will also spin up a container to source data. In the `docker-compose.yml` file, it is expected that you have already built a container out of [althingi-source](https://github.com/fizk/althingi-source) and tagged it as **dev-server**

In the root of the [althingi-source](https://github.com/fizk/althingi-source) directory run:
```sh
docker build  --progress=plain -t dev-server .
```

### Storybook
This repo contains Storybook. Simply run
```sh
$ npm run storybook
```
