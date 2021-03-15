/**
 * A simple function to format object to GET parameters.
 * It skips undefined, null, and NaN values.
 * @example { foo: 'bar', bar: undefined, foobar: 'foo bar', } => '?foo=bar&foobar=foo%20bar'
 * @example { foo: null, bar: undefined, foobar: NaN, } => ''
 */
function getStringifiedParams(object: YT.PlayerVars): string {
  const keys = Object.keys(object) as Array<keyof YT.PlayerVars>;

  const params = keys
    .filter((key) => object[key] !== undefined && object[key] !== null && !Number.isNaN(object[key]) && object[key] !== '')
    .map((key) => `${key}=${String(object[key])}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}

export { getStringifiedParams };
