/**
 * A simple function to format object to GET parameters.
 */
function getStringifiedParams(object: YT.PlayerVars): string {
  const keys = Object.keys(object) as Array<keyof YT.PlayerVars>;

  const params = keys
    .filter((key) => object[key] !== undefined)
    .map((key) => `${key}=${object[key]}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}

export { getStringifiedParams };
