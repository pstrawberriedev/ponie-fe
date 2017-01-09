# ponie-fe
Ponie Club front-end

## Breakdown

*The Build*
- Using Gulp to build
  - Gulp builds front-end JS into ``/dist/public/js``
  - JS is compiling using 'webpack-stream', 'webpack' (need both to use plugins via gulp afaik), 'babel-loader', 'babel-preset-es2015' packages
  - Gulp builds styles (less -> css) with gulp-less + gulp-cssmin into ``/dist/public/css``
  - Gulp copies static front-end assets ``/src/public/static/**/*.*`` -> ``/dist/public``
  - Server JS is simply copied over to ``/dist`` for now

*The API*
- Using Express to serve API
  - Using hbs view engine
  - Using less middleware for dev only!
  - more to come...

## Prerequisite Successes
- Understand JS promises
- Ponie Query service written with promises!
  - Automate querying of services and insert query info into DB
  - Automate querying of databases (i.e. sqlite3, mysql) and insert info into DB
- Linux sysadmin basics & server hardening
- Understand getting SSL certs via letsencrypt
  - Utilizing SSL certs for nginx and mumble-server

## Successes
- Create a dev/build environment from scratch
- Understand Gulp
- Understand Webpack
- Understand Babel

## Goals/To-do
- Understand Express dev environment vs. prod environment
  - How do I ensure I don't use dev middlewares in production (less, webpack/babel)?
  - How do I ensure I am setting up correctly for dev/prod environments on both windows and linux?
  - Do I want to handle developing/watching with Express and building with Gulp?
  - Is there a way to make things more efficient?
- Authentication
- Refactor front-end into React app
- Re-refactor front-end into React + Redux app
