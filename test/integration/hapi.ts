import * as Lab from 'lab'
import { expect } from 'code'
import * as Sinon from 'sinon'

import { Server, Request, ReplyWithContinue } from 'hapi'
import { createContainer, asClass, asFunction, asValue } from 'awilix'

import { AwilixHapiServer } from '../../src/interfaces/AwilixHapiServer'

import { awilixHapiPlugin } from '../../src/awilixHapiPlugin'

const lab = Lab.script()
const { describe, it, beforeEach, afterEach } = lab

export { lab }

class TestService {
  private serviceConstructor: Sinon.SinonSpy
  constructor({ serviceConstructor }:
      { serviceConstructor: Sinon.SinonSpy}) {
    this.serviceConstructor = serviceConstructor
  }
}

class TestClass {
  private testClassConstructor: Sinon.SinonSpy
  private testService: TestService

  constructor({ testClassConstructor, testService }:
      {testClassConstructor: Sinon.SinonSpy, testService: TestService }) {
    this.testClassConstructor = testClassConstructor
    this.testService = testService
  }

  handle(_request: Request, reply: ReplyWithContinue) {
    reply({ success: true })
  }
}

function handleInjector (_request: Request, reply: ReplyWithContinue) {
  return reply({ success: true})
}

function testFactoryFunction({ testFactoryFunctionInvocation, testService }:
    { testFactoryFunctionInvocation: Sinon.SinonSpy, testService: TestService }) {
  return {
    handle(req, res) {
      res.send({ success: true })
    }
  }
}

function createServer(spies) {

  const container = createContainer()
    .register({
      testService: asClass(TestService).scoped()
    })
    // These will be registered as transient.
    .register(spies)

  const server = new Server()
  server.connection({ port: 8000 })

  return server.register({
    register: awilixHapiPlugin as any,
    options: {
      container: container,
      register: function(request, reply) {
        request.container.register({
          testService: asClass(TestService)
        })

        reply.continue()
      }
    }
  })
  .then(() => {

    // server.route({
    //   method: 'GET',
    //   path: '/function',
    //   config: {
    //     pre: 
    //   }
    // })

    // server.route({
    //   method: 'GET',
    //   path: '/class',
    //   config: {
    //     pre: 
    //   }
    // })

    server.route({
      method: 'GET',
      path: '/injector',
      config: {
        pre: (server as AwilixHapiServer).awilixInject('testClassConstructor', 'testService')
      },
      handler: handleInjector
    })
  })
  .then(() => {
    return server
  })

}

describe('awilixHapiPlugin', () => {

  let server: Server
  let serviceConstructor: Sinon.SinonSpy
  let testClassConstructor: Sinon.SinonSpy
  let testFactoryFunctionInvocation: Sinon.SinonSpy

  beforeEach(() => {
    serviceConstructor = Sinon.spy()
    testClassConstructor = Sinon.spy()
    testFactoryFunctionInvocation = Sinon.spy()

    const spies = {
      serviceConstructor: asFunction(serviceConstructor),
      testClassConstructor: asFunction(testClassConstructor),
      testFactoryFunctionInvocation: asFunction(testFactoryFunctionInvocation)
    }

    return createServer(spies).then(s => {
      server = s
    })
  })

  afterEach(() => {
    return server.stop()
  })

  // describe('makeInvoker', () => {
  //   it('makes sure the spy is called once for each request', () => {
  //     return Promise.all([
  //       server.inject('/function'),
  //       server.inject('/function')
  //     ]).then(() => {
  //       expect(testFactoryFunctionInvocation.callCount).to.equal(2)
  //       expect(testClassConstructor.called).to.be.false()
  //       expect(serviceConstructor.callCount).to.equal(2)
  //     })
  //   })
  // })

  // describe('makeClassInvoker', () => {
  //   it('makes sure the spy is called once for each request', () => {
  //     return Promise.all([
  //       server.inject('/class'),
  //       server.inject('/class')
  //     ]).then(() => {
  //       expect(testFactoryFunctionInvocation.called).to.be.false()
  //       expect(testClassConstructor.callCount).to.equal(2)
  //       expect(serviceConstructor.callCount).to.equal(2)
  //     })
  //   })
  // })

  describe('inject', () => {
    it('works', () => {
      return Promise.all([
        server.inject({ url: '/injector' }),
        server.inject({ url: '/injector' })
      ]).then(() => {
        expect(testFactoryFunctionInvocation.called).to.be.false()
        expect(testClassConstructor.callCount).to.equal(2)
        expect(serviceConstructor.callCount).to.equal(2)
      })
    })
  })

})