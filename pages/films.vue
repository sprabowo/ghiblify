<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List Films</h2>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-flex md2 class="py-3">
            <v-btn-toggle v-model="toggle_exclusive">
              <v-btn flat value="grid">
                <v-icon>grid_on</v-icon>
              </v-btn>
              <v-btn flat value="list">
                <v-icon>view_list</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-select
            :items="items"
            v-on:input="onChange"
            v-model="sortedby"
            label="Sort by"
          ></v-select>
        </v-layout>
        <v-layout row wrap>
          <v-flex px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in films">
            <v-card v-if="toggle_exclusive === 'grid'" color="white" class="black--text">
              <v-flex xs12 md12>
                <!-- <v-card-media
                  :src="item.image"
                  height="250px"
                ></v-card-media> -->
                <nuxt-link :to="'films/' + item.id">
                  <img :src="item.image" width="100%" />
                </nuxt-link>
                <v-card-title class="custom__primary__title" primary-title>
                  <v-flex xs10>
                    <nuxt-link :to="'films/' + item.id">
                      <div class="breadcrumb headline mb-0">{{ item.title }}</div>
                      <div>
                        ({{ item.release_date }})
                      </div>
                    </nuxt-link>
                  </v-flex>
                  <v-flex px-1 xs2>
                    <v-icon class="cursor__dong" medium @click="removeBookmark(item)" v-if="item.bookmarked">bookmark</v-icon>
                    <v-icon class="cursor__dong" medium @click="addBookmark(item)" v-else>bookmark_border</v-icon>
                  </v-flex>
                </v-card-title>
              </v-flex>
            </v-card>
            <v-card v-else color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <nuxt-link :to="'films/' + item.id">
                      <img :src="item.image" width="100%" />
                    </nuxt-link>
                    <!-- <v-card-media
                      :src="item.image"
                      height="125px"
                    ></v-card-media> -->
                  </v-flex>
                  <v-flex xs8>
                    <v-layout row>
                      <v-flex xs10>
                        <nuxt-link :to="'films/' + item.id">
                          <div class="headline warna__title">{{ item.title }}</div>
                          <div class="warna__description">{{ item.release_date }}</div>
                          <div class="hidden-md-and-up warna__description">{{ descrify(item.description, 80) + '...' }}</div>
                          <div class="hidden-sm-and-down mt-3 warna__description">{{ item.description }}</div>
                        </nuxt-link>
                      </v-flex>
                      <v-flex px-1 xs2>
                        <v-icon class="cursor__dong" medium @click="removeBookmark(item)" v-if="item.bookmarked">bookmark</v-icon>
                        <v-icon class="cursor__dong" medium @click="addBookmark(item)" v-else>bookmark_border</v-icon>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-layout v-if="loading" mb-2 row>
            <v-flex xs12 text-xs-center>
              <img src="~/assets/img/loader.gif" width="50px" height="50px"/>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "film_list",
  async asyncData({ store }) {
    let result
    result = {
      films: store.state.films,
      sortedby: null,
      toggle_exclusive: 'grid'
    }
    return result
  },
  head() {
		return {
			title: 'Films of Studio Ghibli - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Films of Studio Ghibli - Ghiblify' }
			]
		}
	},
  watch: {
    toggle_exclusive(toggle_exclusive) {
      if (toggle_exclusive) {
        let thumbnail = this.toggleThumbnail
        this.toggleThumbnail = (thumbnail === 'grid') ? 'list' : 'grid'
        this.xs6 = !this.xs6
        this.xs12 = !this.xs12
        this.md4 = !this.md4
        this.md12 = !this.md12
      }
    }
  },
  mounted() {
    this.scrollMore(this.films)
  },
  methods: {
    scrollMore(films) {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true
          let hasil = this.$store.state.films
          for (var h in hasil) {
            films.push(hasil[h])
          }
          this.loading = false
        }
      };
    },
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
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.films, ['title'])
        this.sortedby = 'A-Z'
        this.films = sortingan
      } else if (this.sortedby === 'Newest') {
        sortingan = _.sortBy(this.films, ['release_date'])
        this.sortedby = 'Newest'
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
        { text: 'Newest', value: 'Newest' }
      ],
      xs6: true,
      xs12: false,
      md4: true,
      md12: false,
      loadmore: false,
      loading: true
    }
  },
  components: {
  }
}
</script>
