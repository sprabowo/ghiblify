<template>
  <div>
    <my-breadcrumb :data-content="breadcrumb" />
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-container fluid grid-list-lg>
        	<v-layout row>
						<v-flex xs12 md4 offset-md4>
							<img class="image__people__thumbnail"  :src="item.image" width="100%" />
						</v-flex>
					</v-layout>
        	<v-layout row>
            <v-flex xs12 md8 offset-md2>
							<div>
								<h1 class="warna__title">{{ item.name }}</h1>
								<div class="warna__description">Age: {{ item.age }}</div>
								<div class="warna__description">Gender: {{ item.gender }}</div>
								<div class="warna__description">Hair Color: {{ item.hair_color }}</div>
								<div class="warna__description">Eye Color: {{ item.eye_color }}</div>
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
	name: "people_detail",
	layout: "detail",
  async asyncData({ store, params, error }) {
		let slug = params.slug
		let item
    let result
    let breadcrumb
    breadcrumb = { '/people': 'People' }
    item = store.state.people.find((o) => o.id === slug)
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
