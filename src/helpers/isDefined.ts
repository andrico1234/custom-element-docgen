export function isDefined<T>(val: T): val is Exclude<T, undefined>  {
  return typeof val !== 'undefined'
}
