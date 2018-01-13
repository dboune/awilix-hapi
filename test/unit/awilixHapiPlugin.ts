import * as Lab from 'lab'
import { expect } from 'code'
import { awilixHapiPlugin } from '../../src/awilixHapiPlugin'

const lab = Lab.script();
const { describe, it } = lab

export { lab }

describe ('awilixHapiPlugin', () => {

  it ('returns a hapi registration object', () => {
    expect(awilixHapiPlugin.register).to.exist().and.to.be.a.function()
    expect(awilixHapiPlugin.register.attributes).to.exist().and.to.be.an.object()
    expect(awilixHapiPlugin.register.attributes!.name as string).to.exist().and.to.be.a.string()
    expect(awilixHapiPlugin.register.attributes!.version as string).to.exist().and.to.be.a.string()
  })
})
