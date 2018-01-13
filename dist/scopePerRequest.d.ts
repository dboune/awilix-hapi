import { AwilixContainer } from 'awilix';
/**
 * Returns a hapi request extension function that adds a per-request scoped
 * container to the request
 *
 * Example:
 * ```js
 * const { createContainer } = require('awilix');
 * const { scopePerRequest } = require('awilix-hapi');
 *
 * const container = createContainer();
 * server.decorate('request', scopePerRequest(container), { apply: true });
 * ```
 *
 * @param container An Awilix container
 */
export declare function scopePerRequest(container: AwilixContainer): () => AwilixContainer;
export default scopePerRequest;
