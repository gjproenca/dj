import test from 'ava'
import { mount } from '@vue/test-utils'
import SignIn from '@/components/SignIn.vue'

test('is a Vue instance', (t) => {
  const wrapper = mount(SignIn)
  t.truthy(wrapper.vm)
})
