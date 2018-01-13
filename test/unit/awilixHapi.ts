import * as Lab from 'lab'
import { expect } from 'code'
import * as awilixHapi from '../../src/awilix-hapi'

const lab = Lab.script();
const { describe, it } = lab

export { lab }

describe('awilixHapi', () => {

  it ('exists', () => {
    expect(awilixHapi).to.exist().and.to.be.an.object()
    expect(awilixHapi.inject).to.exist().and.to.be.a.function()
    expect(awilixHapi.scopePerRequest).to.exist().and.to.be.a.function()
    expect(awilixHapi.awilixHapiPlugin).to.exist().and.to.be.an.object()
    // expect(awilixHapi.makeInvoker).to.exist().and.to.be.a.function();
    // expect(awilixExpress.makeClassInvoker).to.exist().and.to.be.a.function();
  });

  // it ('has a member called inject that is a function', (done) => {
  //   expect(awilixHapi.inject).to.exist().and.to.be.a.function()
  //   done()
  // })

  // it ('has a member called scopePerRequest that is a function', (done) => {
  //   expect(awilixHapi.scopePerRequest).to.exist().and.to.be.a.function()
  //   done()
  // })

  // it ('has a member called awilixHapiPlugin that is an object', (done) => {
  //   expect(awilixHapi.awilixHapiPlugin).to.exist().and.to.be.an.object()
  //   done()
  // })

});
