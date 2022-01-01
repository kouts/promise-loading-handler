import { mount } from '@vue/test-utils'
import LoaderTest from '@playground/components/LoaderTest.vue'

const createWrapper = (opts?: Record<string, unknown>) => {
  return mount(LoaderTest, opts)
}

describe('LoaderTest.vue', () => {
  it('should render correctly', async () => {
    const wrapper = createWrapper()

    const strong = await wrapper.find('p > strong')

    expect(strong.text()).toBe('Without loader:')
  })
})
