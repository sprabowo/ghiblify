<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List Bookmark (Films)</h2>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-if="item && item.bookmarked && item.title" px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in films">
            <v-card color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs10 md10>
                    <div>
                      <nuxt-link :to="'films/' + item.id">
                      <div class="headline warna__title">{{ item.title}}</div>
                      <div class="warna__description">{{ item.release_date }}</div>
                      </nuxt-link>
                    </div>
                  </v-flex>
                  <v-flex text-xs-center xs2 md2>
                    <v-icon class="cursor__dong" medium @click="removeBookmark(item)" v-if="item.bookmarked">bookmark</v-icon>
                    <v-icon class="cursor__dong" medium @click="addBookmark(item)" v-else>bookmark_border</v-icon>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex v-if="films.length === 0">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex text-xs-center xs12>
                  Ups there's no bookmark list :(
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "bookmark_list",
  async asyncData({ store }) {
    let result
    result = {
      films: store.state.bookmark,
      sortedby: null
    }
    return result
  },
  head() {
		return {
			title: 'Bookmark - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Bookmark - Ghiblify' }
			]
		}
	},
  watch: {
  },
  mounted() {
  },
  methods: {
    addBookmark(value) {
      this.$store.dispatch('addBookmark', value.id)
      this.$store.dispatch('addListBookmark', value)
      event.preventDefault()
    },
    removeBookmark(value) {
      this.$store.dispatch('removeBookmark', value.id)
      this.films.splice(this.films.indexOf(value), 1)
      this.$store.dispatch('removeListBookmark', value.id)
      event.preventDefault()
    },
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.films, ['name'])
        this.sortedby = 'A-Z'
        this.films = sortingan
      } if (this.sortedby === 'Z-A') {
        sortingan = _.sortBy(this.films, ['name'])
        this.sortedby = 'Z-A'
        this.films = sortingan.reverse()
      }
    }
  },
  layout: 'main',
  data() {
    return {
      films: null,
      sortedby: null,
      items: [
        { text: 'A-Z', value: 'A-Z' },
        { text: 'Z-A', value: 'Z-A' }
      ],
      xs6: false,
      xs12: true,
      md4: false,
      md12: true,
      loadmore: false
    }
  },
  components: {
  }
}
</script>
