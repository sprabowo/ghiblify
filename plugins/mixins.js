import Vue from 'vue'
import store from '../store/index'

Vue.mixin({
  methods: {
    addBookmark(value) {
      this.$store.dispatch('addBookmark', value.id)
      this.$store.dispatch('addListBookmark', value)
      event.preventDefault()
    },
    removeBookmark(value) {
      this.$store.dispatch('removeBookmark', value.id)
      this.$store.dispatch('removeListBookmark', value.id)
      event.preventDefault()
    },
    descrify(desc = null, total = 160) {
      if (desc === null) {
        return ''
      }
      desc = this.strip_tags(desc)
      let lastChar = desc.substr(total, 1)
      if (desc.length > total) {
        if (lastChar !== ' ') {
          while (lastChar !== ' ') {
            total--
            lastChar = desc.substr(total, 1)
          }
          return lastChar = desc.substr(0, total)
        }
        return lastChar = desc.substr(0, total)
      }
      else {
        return desc
      }
    },
    strip_tags(value) {
      if (value === '' || value === null) {
        return ''
      }
      return value.replace(/(<([^>]+)>)/ig, "")
    }
  }
})