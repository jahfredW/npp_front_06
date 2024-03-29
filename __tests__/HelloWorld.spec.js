import { describe, it, expect } from 'vitest'
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld', () => {
  const vuetify = createVuetify({ components, directives })
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      global: {
        plugins: [vuetify],
      }, props: { title: 'Welcome to the Vuetify 3' } })
    expect(wrapper.text()).toContain('Welcome to the Vuetify 3')
  })
})
