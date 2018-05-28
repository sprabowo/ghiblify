<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List Locations</h2>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-select
            min-width="127"
            :items="items"
            v-on:input="onChange"
            v-model="sortedby"
            label="Sort by"
          ></v-select>
        </v-layout>
        <v-layout row wrap>
          <v-flex px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in locations">
            <v-card nuxt :to="'locations/' + item.id" color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <!-- <v-flex xs4>
                    <img class="image__people__thumbnail"  :src="item.image" width="100%" />
                      <v-card-media
                      :src="item.image"
                      height="125px"
                    ></v-card-media>
                  </v-flex> -->
                  <v-flex xs12>
                    <div>
                      <div class="headline warna__title">{{ item.name }}</div>
                      <div class="warna__description">Climate: {{ item.climate }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-if="loading" mb-2 row>
          <v-flex xs12 text-xs-center>
            <img src="~/assets/img/loader.gif" width="50px" height="50px"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "locations_list",
  async asyncData({ store }) {
    let result
    result = {
      locations: store.state.locations,
      sortedby: null
    }
    return result
  },
  head() {
		return {
			title: 'Locations of Studio Ghibli - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Locations of Studio Ghibli - Ghiblify' }
			]
		}
	},
  mounted() {
    this.scrollMore(this.locations)
  },
  methods: {
    scrollMore(locations) {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true
          let hasil = this.$store.state.locations
          for (var h in hasil) {
            locations.push(hasil[h])
          }
          this.loading = false
        }
      };
    },
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.locations, ['name'])
        this.sortedby = 'A-Z'
        this.locations = sortingan
      } if (this.sortedby === 'Z-A') {
        sortingan = _.sortBy(this.locations, ['name'])
        this.sortedby = 'Z-A'
        this.locations = sortingan.reverse()
      }
    }
  },
  layout: 'main',
  data() {
    return {
      locations: null,
      sortedby: null,
      items: [
        { text: 'A-Z', value: 'A-Z' },
        { text: 'Z-A', value: 'Z-A' }
      ],
      xs6: false,
      xs12: true,
      md4: false,
      md12: true,
      loadmore: false,
      loading: false
    }
  },
  components: {
  }
}
</script>
