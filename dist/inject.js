"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function inject(...dependencies) {
    return dependencies.reduce(buildDependencyPrequisites, []);
}
exports.inject = inject;
/**
 * Builds a hapi route prerequesite object that resolves a requested dependency,
 * adding it to an array
 *
 * @param pre
 * @param dependency
 */
function buildDependencyPrequisites(pre, dependency) {
    pre.push({
        method: function (request, reply) {
            return reply(request.container.resolve(dependency));
        },
        assign: dependency
    });
    return pre;
}
