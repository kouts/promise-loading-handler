import NProgress from 'nprogress'
import { createLoader } from '@/createLoader'

NProgress.configure({
  minimum: 0.35,
  speed: 300
})

const disableArrowKeys = (e: KeyboardEvent) => {
  const keyCodes = [32, 37, 38, 39, 40]

  if (keyCodes.includes(e.keyCode)) {
    e.preventDefault()
  }
}

const start = () => {
  NProgress.start()
  document.addEventListener('keydown', disableArrowKeys)
  const main = document.querySelector('body')

  if (main) {
    const loading = document.querySelector('.loading') ?? document.createElement('div')

    loading.innerHTML = 'Loading...'
    loading.classList.add('loading')
    main.insertBefore(loading, main.firstChild)
  }
}

const end = () => {
  NProgress.done()
  document.removeEventListener('keydown', disableArrowKeys)
  const loading = document.querySelector('.loading')

  if (loading && loading.parentNode) {
    loading.parentNode.removeChild(loading)
  }
}

const inc = () => {
  NProgress.inc(0.05)
}

const loader = createLoader({ start, end, slackTime: 350, inc })

export const { load } = loader
