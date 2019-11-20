import { TmsRequestError } from 'src/core/tms-request-error';

describe('tms-request-err', function() {
  it('初始化会正常返回TmsRequestError实例', function() {
    // @ts-ignore
    expect(new TmsRequestError() instanceof TmsRequestError).toBe(true);
  });

  it('message会正常传入', function() {
    // @ts-ignore
    expect(new TmsRequestError('aaa').message).toBe('aaa');
  });

  it('message不传入为network error', function() {
    // @ts-ignore
    expect(new TmsRequestError().message).toBe('network error');
  });

  it('type不传入为network', function() {
    // @ts-ignore
    expect(new TmsRequestError().type).toBe('network');
  });

  it('传入type显示对应type1', function() {
    // @ts-ignore
    expect(new TmsRequestError(null, null, 'network').type).toBe('network');
  });

  it('传入type显示对应type2', function() {
    // @ts-ignore
    expect(new TmsRequestError(null, null, 'program').type).toBe('program');
  });

  it('传入type显示对应type2', function() {
    const response = {};
    // @ts-ignore
    expect(new TmsRequestError(null, response, 'program').response).toBe(response);
  });

  it('传入type显示对应type2', function() {
    const response = {};
    // @ts-ignore
    expect(new TmsRequestError(null, response, 'program').requestError).toBe(true);
  });


});
