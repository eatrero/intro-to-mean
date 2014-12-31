[![Coverage Status](https://coveralls.io/repos/eatrero/intro-to-mean/badge.png)](https://coveralls.io/r/eatrero/intro-to-mean)

# Demo code for Intro to the MEAN Stack
The content of this repo was created for an Intro to the MEAN Stack presentation for [Frontend Authority Meetup 11/20/2014] (http://www.meetup.com/frontendauthority/events/213216622/). The demo is a simple todo app with RESTful api using NodeJS/Express/MongoDB and a single page application using Angular.

The presentation slide deck can be found here:
https://slides.com/edatrero/intro-to-mean-stack

### Quick Start
To get started, clone this repo.
```sh
$ git clone https://github.com/eatrero/intro-to-mean.git 
```

Run a local mongodb server
```sh
$ mongodb
```

Next, run the node server
```sh
$ cd intro-to-mean
$ npm install
$ node server/server.js
```

Finally, point your browser to:
http://localhost:3245/

### Tests
Includes api tests using mocha test runner.

```sh
$ cd server/tests
$ npm install -g mocha
$ npm install
$ mocha index
```

### License
[MIT](https://github.com/strongloop/express/blob/master/LICENSE)
