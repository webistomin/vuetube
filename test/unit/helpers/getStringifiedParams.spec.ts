import { getStringifiedParams } from '@/helpers/getStringifiedParams';

describe('getStringifiedParams.ts', () => {
  it('return builded GET-params string', () => {
    const object: YT.PlayerVars = {
      autohide: 1,
      autoplay: 0,
      color: 'white',
      controls: undefined,
    };

    const result = getStringifiedParams(object);

    expect(result).toEqual('?autohide=1&autoplay=0&color=white');
  });

  it('return empty string for empty object', () => {
    const object: YT.PlayerVars = {};

    const result = getStringifiedParams(object);

    expect(result).toEqual('');
  });
});
