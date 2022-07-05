export { default as AlertBox } from '../../components/AlertBox.vue'
export { default as CarForm } from '../../components/CarForm.vue'
export { default as FormModal } from '../../components/Form-Modal.vue'
export { default as GalleryCard } from '../../components/GalleryCard.vue'
export { default as Navbar } from '../../components/Navbar.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
