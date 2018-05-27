<template>
  <div>
    <my-breadcrumb :data-content="breadcrumb" />
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-container fluid grid-list-lg>
        	<v-layout row>
						<v-flex xs12 md4 offset-md4>
							<img :src="item.image" width="100%" />
						</v-flex>
					</v-layout>
        	<v-layout row>
            <v-flex xs12 md8 offset-md2>
							<div>
								<h1 class="warna__title">{{ item.title }}</h1>
								<div class="warna__description">Release Date: {{ item.release_date }}</div>
								<div class="warna__description">Director: {{ item.director }}</div>
								<div class="warna__description">Producer: {{ item.producer }}</div>
                <br>
                <p class="warna__description">{{ item.description }}</p>
							</div>
						</v-flex>
					</v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MyBreadcrumb from '~/components/Breadcrumb'

export default {
	name: "film_detail",
	layout: "detail",
  async asyncData({ store, params, error }) {
		let slug = params.slug
		let item
    let result
    let breadcrumb
    breadcrumb = { '/films': 'Films' }
    item = store.state.films.find((o) => o.id === slug)
		if (item === undefined) {
      return error({ statusCode: 404, message: '404 Not Found' })
    }
    result = {
      item: item,
      breadcrumb: breadcrumb
    }
    return result
  },
  layout: 'main',
  data() {
    return {
      films: null
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>
