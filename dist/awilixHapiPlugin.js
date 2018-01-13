"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopePerRequest_1 = require("./scopePerRequest");
const inject_1 = require("./inject");
const packageInfo = require("../package.json");
/**
 * hapi plugin registration function
 *
 * @param server Hapi.Server  The hapi server
 * @param options Object      Options necessary for the operation of awilix-hapi
 * @param next Function
 */
function registerPlugin(server, options, next) {
    server.decorate('request', 'container', scopePerRequest_1.scopePerRequest(options.container), { apply: true });
    options.register && server.ext('onRequest', options.register);
    server.decorate('server', 'awilixInject', inject_1.inject);
    next();
}
/**
 * hapi plugin registration object
 */
exports.awilixHapiPlugin = {
    register: registerPlugin
};
/**
 * hapi plugin registration attributes
 */
exports.awilixHapiPlugin.register.attributes = {
    name: 'awilix-hapi',
    version: packageInfo.version
};
exports.default = exports.awilixHapiPlugin;
