<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List People</h2>
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
            :items="itemsfilter"
            v-on:input="onChangeFilter"
            v-model="filterby"
            label="Filter by"
          ></v-select>
          <v-select
            :items="items"
            v-on:input="onChange"
            v-model="sortedby"
            label="Sort by"
          ></v-select>
        </v-layout>
        <v-layout row wrap>
          <v-flex px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in people">
            <v-card nuxt v-if="toggle_exclusive === 'grid'" :to="'people/' + item.id" color="white" class="black--text">
              <v-flex xs12 md12>
                <!-- <v-card-media
                  :src="item.image"
                  height="250px"
                ></v-card-media> -->
                <img class="image__people__thumbnail" :src="item.image" width="100%" />
                <v-card-title class="custom__primary__title" primary-title>
                  <div>
                    <div class="headline mb-0">{{ item.name }}</div>
                    <!-- <div>Gender ({{ item.gender }})</div> -->
                  </div>
                </v-card-title>
              </v-flex>
            </v-card>
            <v-card nuxt v-else :to="'people/' + item.id" color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <!-- <v-card-media
                      :src="item.image"
                      height="125px"
                    ></v-card-media> -->
                    <img class="image__people__thumbnail" :src="item.image" width="100%" />
                  </v-flex>
                  <v-flex xs8>
                    <div>
                      <div class="headline warna__title">{{ item.name }}</div>
                      <div class="warna__description">Gender: {{ item.gender }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "people_list",
  async asyncData({ store }) {
    let result
    result = {
      people: store.state.people,
      sortedby: null,
      filterby: null,
      toggle_exclusive: 'grid'
    }
    return result
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
    },
    loadmore(loadmore) {
      if (loadmore) {
        if (this.filterby === null) {
          this.addMore()
        }
      }
    }
  },
  head() {
		return {
			title: 'People of Studio Ghibli - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'People of Studio Ghibli - Ghiblify' }
			]
		}
	},
  mounted() {
    window.addEventListener('scroll', () => {
      this.loadmore = this.bottomLoadMore()
    })
  },
  methods: {
    bottomLoadMore() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    addMore() {
      let hasil = this.$store.state.people
      for (var h in hasil) {
        this.people.push(hasil[h])
      }
    },
    onChangeFilter() {
      let sortingan
      if (this.filterby === 'Male') {
        this.people = this.$store.state.people
        sortingan = this.people.filter((o) => o.gender === 'Male')
        this.filterby = 'Male'
        this.people = sortingan
      } else if (this.filterby === 'Female') {
        this.people = this.$store.state.people
        sortingan = this.people.filter((o) => o.gender === 'Female')
        this.filterby = 'Female'
        this.people = sortingan
      } else {
        this.people = this.$store.state.people
      }
    },
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.people, ['name'])
        this.sortedby = 'A-Z'
        this.people = sortingan
      } else if (this.sortedby === 'Z-A') {
        sortingan = _.sortBy(this.people, ['name'])
        this.sortedby = 'Z-A'
        this.people = sortingan.reverse()
      }
    }
  },
  layout: 'main',
  data() {
    return {
      people: null,
      sortedby: null,
      items: [
        { text: 'A-Z', value: 'A-Z' },
        { text: 'Z-A', value: 'Z-A' }
      ],
      itemsfilter: [
        { text: 'Reset', value: null },
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' }
      ],
      xs6: true,
      xs12: false,
      md4: true,
      md12: false,
      loadmore: false
    }
  },
  components: {
  }
}
</script>
