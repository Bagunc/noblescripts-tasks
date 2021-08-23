export const required = msg => x => !x && msg;
export const enabled = msg => x => x == true || msg;
export const min = min => msg => x => (!x || x.length >= min) || msg;
export const max = max => msg => x => (!x || x.length <= max) || msg;
export const email = msg => x => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (!x || regexp.test(x)) || msg
}
export const equal = msg => (...xs) => xs.every(x => x === xs[0]) || msg