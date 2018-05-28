<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List Vehicles</h2>
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
          <v-flex px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in vehicles">
            <v-card nuxt v-if="toggle_exclusive === 'grid'" :to="'vehicles/' + item.id" color="white" class="black--text">
              <v-flex xs12 md12>
                <!-- <v-card-media
                  :src="item.image"
                  height="250px"
                ></v-card-media> -->
                <img class="image__people__thumbnail" :src="item.image" width="100%" />
                <v-card-title class="custom__primary__title" primary-title>
                  <div>
                    <div class="headline mb-0">{{ item.name }}</div>
                    <div>({{ item.vehicle_class }})</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-card>
            <v-card nuxt v-else :to="'vehicles/' + item.id" color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <img class="image__people__thumbnail"  :src="item.image" width="100%" />
                    <!-- <v-card-media
                      :src="item.image"
                      height="125px"
                    ></v-card-media> -->
                  </v-flex>
                  <v-flex xs8>
                    <div>
                      <div class="headline warna__title">{{ item.name }}</div>
                      <div class="warna__description">{{ item.vehicle_class }}</div>
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
  name: "vehicles_list",
  async asyncData({ store }) {
    let result
    result = {
      vehicles: store.state.vehicles,
      sortedby: null,
      toggle_exclusive: 'grid'
    }
    return result
  },
  head() {
		return {
			title: 'Vehicles of Studio Ghibli - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Vehicles of Studio Ghibli - Ghiblify' }
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
    },
    loadmore(loadmore) {
      if (loadmore) {
        this.addMore()
      }
    }
  },
  mounted() {
    this.scrollMore(this.vehicles)
  },
  methods: {
    scrollMore(vehicles) {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true
          let hasil = this.$store.state.vehicles
          for (var h in hasil) {
            vehicles.push(hasil[h])
          }
          this.loading = false
        }
      };
    },
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.vehicles, ['name'])
        this.sortedby = 'A-Z'
        this.vehicles = sortingan
      } if (this.sortedby === 'Z-A') {
        sortingan = _.sortBy(this.vehicles, ['name'])
        this.sortedby = 'Z-A'
        this.vehicles = sortingan.reverse()
      }
    }
  },
  layout: 'main',
  data() {
    return {
      vehicles: null,
      sortedby: null,
      items: [
        { text: 'A-Z', value: 'A-Z' },
        { text: 'Z-A', value: 'Z-A' }
      ],
      xs6: true,
      xs12: false,
      md4: true,
      md12: false,
      loadmore: false,
      loading: false
    }
  },
  components: {
  }
}
</script>
