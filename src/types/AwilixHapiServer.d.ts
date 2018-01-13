import { Server, RoutePrerequisiteObjects } from "hapi"

/**
 * Interface for a hapi server that has been decorated with the inject function
 */
interface AwilixHapiServer extends Server {

  /**
   * Injects named objects from the container into a request. 
   * 
   * Example:
   * ```js
   *  server.route({
   *    method: 'GET',
   *    path: '/todo',
   *    config: {
   *      pre: (server as AwilixHapiServer).awilixInject('someValue', 'myOperation')
   *    },
   *    handler: handleInjector
   *  })
   * ```
   */
  awilixInject: (...dependencies: string[]) => RoutePrerequisiteObjects[]
}