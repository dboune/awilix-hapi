import * as Lab from 'lab'
import { expect } from 'code'

import { RoutePrerequisiteObjects, RoutePrerequisiteRequestHandler, ReplyNoContinue } from 'hapi'
import { AwilixRequest } from '../../src/interfaces/AwilixRequest'

import { createContainer, asValue, asClass } from 'awilix'
import { inject } from '../../src/inject'

const lab = Lab.script();
const { describe, it } = lab

export { lab }

describe('inject', () => {
  it('returns prerequesite functions that resolves objects and attaches them to the request', () => {
    const container = createContainer()
    const value = 'ABC'
    class Class { }

    container
      .register({ value: asValue(value) })
      .register({ instance: asClass(Class) })

    const prerequesites: RoutePrerequisiteObjects[] = inject('value', 'instance')
    const request = { container } as AwilixRequest;

    request['pre'] = prerequesites.reduce((pre: any, prerequesite) => {
      pre[prerequesite.assign] = (prerequesite.method as RoutePrerequisiteRequestHandler)(
        request,
        <ReplyNoContinue> function (value: any) {
          return value 
        }
      )

      return pre
    }, {})

    expect((request.pre as any)['value']).to.equal('ABC')
    expect((request.pre as any)['instance']).to.be.instanceOf(Class)
  });
});