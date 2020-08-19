export default function debounce(fn: Function, interval = 300) {
  let timer = null
  return (...rest) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...rest), interval)
  }
}
