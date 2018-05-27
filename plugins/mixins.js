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
      console.log(this.$store.state.bookmark)
      event.preventDefault()
    }
  }
})