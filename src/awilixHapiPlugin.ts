import { AwilixContainer } from 'awilix';
import { Server, PluginRegistrationObject, ServerExtRequestHandler } from 'hapi'
import { scopePerRequest } from './scopePerRequest'
import { inject } from './inject'
import * as packageInfo from '../package.json';

/**
 * Options for awilix-hapi plugin
 */
export interface AwilixHapiOptions {

  /**
   * An Awilix container that will be used to create a scoped container per request
   */
  container: AwilixContainer

  /**
   * A hapi Request extension handler function used to register objects directly
   * in the scoped container
   */
  register?: ServerExtRequestHandler
}

/**
 * hapi plugin registration function
 * 
 * @param server Hapi.Server  The hapi server
 * @param options Object      Options necessary for the operation of awilix-hapi
 * @param next Function
 */
function registerPlugin (server: Server, options: AwilixHapiOptions, next: (err?: Error) => void): void {

  server.decorate('request', 'container', scopePerRequest(options.container), { apply: true })

  options.register && server.ext('onRequest', options.register);

  server.decorate('server', 'awilixInject', inject)
  
  next()
}

/**
 * hapi plugin registration object
 */
export const awilixHapiPlugin: PluginRegistrationObject<AwilixHapiOptions> = {
  register: registerPlugin
}

/**
 * hapi plugin registration attributes
 */
awilixHapiPlugin.register.attributes = {
  name: 'awilix-hapi',
  version: (packageInfo as any).version
}

export default awilixHapiPlugin