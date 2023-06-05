import { describe, it, expect } from 'vitest'
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { mount } from '@vue/test-utils'
import AlbumCard from '@/components/AlbumCard.vue'

describe('AlbumCard', () => {
  
 
const vuetify = createVuetify({ components, directives })


const wrapper = mount(AlbumCard, {
      props: { test : {  'name' : 'fred' }},
      global: {
        plugins: [vuetify],
      }
    })
 
const switchValue = wrapper.vm.switchValue;
switchValue.value = 'fred';

it('renders properly', () => {
    expect(wrapper.text()).toContain('Consulter')
  })
})