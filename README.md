# awilix-hapi

Dependency injection [Awilix 2](https://github.com/jeffijoe/awilix) helpers and scope-instantiating plugin for **hapi**

Based directly on [awlix-express](https://github.com/talyssonoc/awilix-express)

## Installation

```sh
npm install --sae awilix-hapi
```

or

```sh
yarn add awilix-hapi
```

_Requires Node v6 or above_

## Usage

Decorate your hapi server

```js
const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-hapi');

const container = createContainer();

container.registerClass({
  // Scoped lifetime = new instance per request
  // Imagine the TodosService needs a `user`.
  // class TodosService { constructor({ user }) { } }
  todosService: [TodosService, Lifetime.SCOPED]
});

container.registerValue({ theAnswer: 42 });

// Decorate the request, passing it your Awilix container
// This will attach a scoped container on each request
server.decorate('request', scopePerRequest(container), { apply: true });

// `onRequest` occurs prior to routing
server.ext('onRequest', function(request, reply) {
  request.container.registerValue({
      user: request.user // Some value in the request
  })

  reply.continue()
});

```

Then in your route handlers...

```js
const { inject } = require('awilix-hapi');
// `inject` accepts multiple parameters, not an array

server.route({
  method: 'GET'.
  path: '/todos',
  config: {
    pre: [ inject('todosService', 'theAnswer') ]
  },
  handler: function(request, reply) {
    request.pre.todosService.find().then((result) => {
      reply({
        result,
        answer: request.pre.theAnswer
      });
    });
  }
});

```

### Usage as a plugin

Register the plugin

```js
const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-hapi');

const container = createContainer();

container.registerClass({
  // Scoped lifetime = new instance per request
  // Imagine the TodosService needs a `user`.
  // class TodosService { constructor({ user }) { } }
  todosService: [TodosService, Lifetime.SCOPED]
});

container.registerValue({ theAnswer: 42 });

const awilixHapi = require('awilix-hapi')

console.log(awilixHapi)

server.register({
  register: ,
  options: { 
    container,
    register: function(request, reply) {
      request.container.registerValue({
        user: request.user // Some value in the request
      })

      reply.continue()
    }
  }
});

```

Then in your route handlers...

```js
server.route({
  method: 'GET'.
  path: '/todos',
  config: {
    pre: [ server.inject('todosService', 'theAnswer') ]
  },
  handler: function(request, reply) {
    request.pre.todosService.find().then((result) => {
      reply({
        result,
        answer: request.pre.theAnswer
      });
    });
  }
});
```
