<template>
  <div>
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-layout row>
          <h2 class="py-1 pl-2">Films</h2>
          <v-spacer></v-spacer>
          <v-btn small nuxt to="films" outline>
            See All
          </v-btn>
        </v-layout>
        <v-layout row>
          <v-flex mx-1 xs12 md4 :key="i" v-for="(item, i) in films.slice(0, 4)">
            <v-card nuxt :to="'films/' + item.id" color="white" class="black--text">
              <v-flex xs12 md12>
                <v-card-media class="hidden-sm-and-down"
                  :src="item.image"
                  height="250px"
                ></v-card-media>
                <v-card-media class="hidden-md-and-up"
                  :src="item.image"
                  height="100px"
                ></v-card-media>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout mt-4 row>
          <h2 class="py-1 pl-2">People</h2>
          <v-spacer></v-spacer>
          <v-btn small nuxt to="people" outline>
            See All
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-for="(item, i) in people.slice(0,2)" :key="i" px-1 md6 xs12>
            <v-card nuxt :to="'people/' + item.id" color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media
                      :src="item.image"
                      height="125px"
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs7>
                    <div>
                      <div class="headline warna__title">{{ item.title }}</div>
                      <div class="warna__description">Age: {{ item.age }}</div>
                      <div class="warna__description">Gender: {{ item.gender }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout mt-4 row>
          <h2 class="py-1 pl-2">Vehicles</h2>
          <v-spacer></v-spacer>
          <v-btn small nuxt to="vehicles" outline>
            See All
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-for="(item, i) in vehicles.slice(0,2)" :key="i" py-2 px-2 md6 xs12>
            <v-card nuxt :to="'vehicles/' + item.id" color="white" class="black--text">
              <v-flex xs12 md12>
                <v-card-media
                  :src="item.image"
                  height="250px"
                ></v-card-media>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout mt-4 row>
          <h2 class="py-1 pl-2">Locations</h2>
          <v-spacer></v-spacer>
          <v-btn small nuxt to="locations" outline>
            See All
          </v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-for="(item, i) in locations.slice(0,3)" :key="i" px-1 md12 xs12>
            <v-card nuxt :to="'locations/' + item.id" color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
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

        <v-layout mt-4 row>
          <h2 class="py-1 pl-2">Species</h2>
          <v-spacer></v-spacer>
          <v-btn small nuxt to="species" outline>
            See All
          </v-btn>
        </v-layout>
        <v-layout row>
          <v-carousel hide-delimiters lazy>
            <v-carousel-item v-for="(item,i) in species.slice(0, 5)" v-if="item.image !== null" :src="item.image" :key="i"></v-carousel-item>
          </v-carousel>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  async asyncData({ store }) {
    let result
    result = {
      films: store.state.films,
      people: store.state.people,
      species: store.state.species,
      vehicles: store.state.vehicles,
      locations: store.state.locations
    }
    // console.log(result)
    return result
  },
  head() {
		return {
			title: 'Ghiblify - Studio Ghibli',
			meta: [
				// { charset: 'utf-8' },
				// { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'description', name: 'description', content: 'Ghiblify - Studio Ghibli' }
			]
		}
	},
  layout: 'main',
  data() {
    return {
      films: null,
      species: null,
      people: null,
      vehicles: null,
      locations: null
    }
  },
  components: {
  }
}
</script>
