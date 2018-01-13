import { AwilixContainer } from 'awilix';
import { PluginRegistrationObject, ServerExtRequestHandler } from 'hapi';
/**
 * Options for awilix-hapi plugin
 */
export interface AwilixHapiOptions {
    /**
     * An Awilix container that will be used to create a scoped container per request
     */
    container: AwilixContainer;
    /**
     * A hapi Request extension handler function used to register objects directly
     * in the scoped container
     */
    register?: ServerExtRequestHandler;
}
/**
 * hapi plugin registration object
 */
export declare const awilixHapiPlugin: PluginRegistrationObject<AwilixHapiOptions>;
export default awilixHapiPlugin;
