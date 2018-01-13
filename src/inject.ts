import { ReplyNoContinue, RoutePrerequisiteObjects, Request } from 'hapi'
import { AwilixRequest } from './types/AwilixRequest'

/**
 * Returns a set of hapi route prerequesite objects that resolve the requested
 * dependencies
 * 
 * inject('name1'[, 'name2' [,'name3' ...]])
 * 
 * Example:
 * ```js
 * const { inject } = require('awilix-hapi');
 * `inject` accepts multiple parameters, not an array
 *
 * server.route({
 *   method: 'GET'.
 *   path: '/todos',
 *   config: {
 *     pre: [ inject('todosService', 'theAnswer') ]
 *   },
 *   handler: function(request, reply) {
 *     request.pre.todosService.find().then((result) => {
 *       reply({
 *         result,
 *         answer: request.pre.theAnswer
 *       });
 *     });
 *   }
 * });
 * ```
 * 
 * @param dependencies string A list of dependency names
 */
export function inject (...dependencies: string[]) {

  return dependencies.reduce(buildDependencyPrequisites, [])

}

/**
 * Builds a hapi route prerequesite object that resolves a requested dependency,
 * adding it to an array
 * 
 * @param pre 
 * @param dependency 
 */
function buildDependencyPrequisites(pre: RoutePrerequisiteObjects[], dependency: string) {

  pre.push({
    method: function(request: Request, reply: ReplyNoContinue) {
      return reply((request as AwilixRequest).container.resolve(dependency))
    },
    assign: dependency
  })

  return pre
}
