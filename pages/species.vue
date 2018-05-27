<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout my-2 row>
          <v-spacer></v-spacer>
          <h2>List Species</h2>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-select
            :items="items"
            v-on:input="onChange"
            v-model="sortedby"
            label="Sort by"
          ></v-select>
        </v-layout>
        <v-layout row wrap>
          <v-flex px-2 py-2 :class="{ 'xs6': xs6, 'xs12': xs12, 'md12': md12, 'md4': md4 }" :key="i" v-for="(item, i) in species">
            <v-card nuxt :to="'species/' + item.id" color="white" class="black--text">
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
                      <div class="warna__description">Classification: {{ item.classification }}</div>
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
  name: "species_list",
  async asyncData({ store }) {
    let result
    result = {
      species: store.state.species,
      sortedby: null
    }
    return result
  },
  head() {
		return {
			title: 'Species of Studio Ghibli - Ghiblify',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Species of Studio Ghibli - Ghiblify' }
			]
		}
	},
  watch: {
    loadmore(loadmore) {
      if (loadmore) {
        this.addMore()
      }
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
      // this.nowLoading = true
      // let pageIn = parseInt(this.page)
      // let limitIn = this.limit
      // let hasil = await keyword(9908, pageIn, limitIn)
      let hasil = this.$store.state.species
      for (var h in hasil) {
        this.species.push(hasil[h])
      }
      // console.log(pageIn)
      // console.log(hasil)
      // this.page = pageIn
      // if (hasil.result.length > 0) {
      //   for (var i = 0; i < hasil.result.length; i++) {
      //     this.listarticle.push(hasil.result[i])
      //   }
      //   this.nowLoading = false
      // } else {
      //   this.nowLoading = false
      //   this.nowFinish = true
      // }
    },
    onChange() {
      let sortingan
      if (this.sortedby === 'A-Z') {
        sortingan = _.sortBy(this.species, ['name'])
        this.sortedby = 'A-Z'
        this.species = sortingan
      } if (this.sortedby === 'Z-A') {
        sortingan = _.sortBy(this.species, ['name'])
        this.sortedby = 'Z-A'
        this.species = sortingan.reverse()
      }
    }
  },
  layout: 'main',
  data() {
    return {
      species: null,
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
