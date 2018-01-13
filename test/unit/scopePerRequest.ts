import * as Lab from 'lab'
import { expect } from 'code'

import { createContainer } from 'awilix'
import { Request } from 'hapi'
import { scopePerRequest } from '../../src/scopePerRequest'

const lab = Lab.script();
const { describe, it } = lab

export { lab }

describe('scopePerRequest', () => {
  it('creates a child container', () => {
    const container = createContainer();
    const ext = scopePerRequest(container);
    const request = {} as Request
    const child = ext(request)

    const FAMILY_TREE = Object.getOwnPropertySymbols(child)[0]

    expect(child.cradle).to.exist()
    expect((child as {[x: string]: any})[FAMILY_TREE]).to.not.equal((container as {[x: string]: any})[FAMILY_TREE][0])
    expect((child as {[x: string]: any})[FAMILY_TREE][1]).to.equal((container as {[x: string]: any})[FAMILY_TREE][0])
  })
})
