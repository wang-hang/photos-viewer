export default function debounce(fn?: any, interval = 300) {
  let timer = null
  return (...rest) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(null, ...rest)
        clearTimeout(timer)
      }, interval)
  }
}
