/**
 * Return typeof value
 */
function toType(value: unknown): string {
  return typeof value;
}

/**
 * Check is typeof value is function
 */
function isFunction(value: unknown): boolean {
  return toType(value) === 'function';
}

export {
  toType,
  isFunction,
};
