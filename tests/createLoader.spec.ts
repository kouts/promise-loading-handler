import { createLoader } from '@/createLoader'
import { sleep } from './utils'

describe('createLoader', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // mute console.log
    })
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const start = jest.fn(() => {
    console.log('start')
  })

  const end = jest.fn(() => {
    console.log('end')
  })

  const inc = jest.fn(() => {
    console.log('inc')
  })

  it('should call start and end methods once', async () => {
    jest.useFakeTimers()
    const { load } = createLoader({ start, end })

    load(sleep(100))
    load(sleep(110))
    load(sleep(120))

    jest.advanceTimersByTime(200)
    await Promise.resolve() // let any pending callbacks in PromiseJobs run
    jest.advanceTimersByTime(200)

    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
  })

  it('should call the increment method correctly', async () => {
    jest.useFakeTimers()
    const { load } = createLoader({ start, end, inc })

    load(sleep(100))
    load(sleep(110))
    load(sleep(120))
    load(sleep(130))

    jest.advanceTimersByTime(200)
    await Promise.resolve()
    jest.advanceTimersByTime(200)

    expect(inc).toHaveBeenCalledTimes(3)
  })

  it('should fire multiple times when slacktime duration is not long enough', async () => {
    const { load } = createLoader({ start, end, slackTime: 2 })

    load(sleep(5))
    await sleep(10)
    load(sleep(5))
    sleep(20).then(() => {
      expect(start).toHaveBeenCalledTimes(2)
      expect(end).toHaveBeenCalledTimes(2)
    })
  })

  it('should fire once when slacktime duration is long enough', async () => {
    const { load } = createLoader({ start, end, slackTime: 12 })

    load(sleep(5))
    await sleep(10)
    load(sleep(5))
    sleep(50).then(() => {
      expect(start).toHaveBeenCalledTimes(1)
      expect(end).toHaveBeenCalledTimes(1)
    })
  })

  it('works with a method that returns a promise', async () => {
    jest.useFakeTimers()
    const { load } = createLoader({ start, end })

    load(() => sleep(100))

    jest.advanceTimersByTime(200)
    await Promise.resolve()
    jest.advanceTimersByTime(200)

    expect(start).toHaveBeenCalledTimes(1)
    expect(end).toHaveBeenCalledTimes(1)
  })
})
