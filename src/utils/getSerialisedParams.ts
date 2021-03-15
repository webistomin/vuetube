export interface IParamsObject {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * A simple function to format object to GET parameters.
 * It skips undefined, null, and NaN values.
 * @example { foo: 'bar', bar: undefined, foobar: 'foo bar', } => '?foo=bar&foobar=foo%20bar'
 * @example { foo: null, bar: undefined, foobar: NaN, } => ''
 */
export default function getSerialisedParams(object: IParamsObject): string {
  const keys = Object.keys(object);

  const params = keys
    .filter((key) => object[key] !== undefined && object[key] !== null && !Number.isNaN(object[key]) && object[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(object[key]))}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}
