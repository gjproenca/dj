import test from 'ava'
import { mount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

test('is a Vue instance', (t) => {
  const wrapper = mount(Login)
  t.truthy(wrapper.vm)
})
