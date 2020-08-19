import debounce from './debounce'

export default function rem(designWidth = 375, base = 100) {
  const html = document.querySelector('html')
  const w = window.innerWidth
  const ft = w * base / designWidth
  html.style.fontSize = `${ft}px`
}
rem()
window.addEventListener('resize', debounce(() => rem()))
