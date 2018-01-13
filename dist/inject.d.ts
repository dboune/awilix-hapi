import { RoutePrerequisiteObjects } from 'hapi';
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
export declare function inject(...dependencies: string[]): RoutePrerequisiteObjects[];
