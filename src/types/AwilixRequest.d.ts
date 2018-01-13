import { Request } from 'hapi'
import { AwilixContainer } from 'awilix'

/**
 * A hapi Request object extended with a property containing an Awilix container
 */
interface AwilixRequest extends Request {

  /**
   * A per-request scoped Awilix container
   */
  container: AwilixContainer
}
