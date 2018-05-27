<template>
  <div>
    <my-breadcrumb :data-content="breadcrumb" />
    <v-layout row>
      <v-flex md8 offset-md2 xs12>
        <v-container fluid grid-list-lg>
        	<v-layout row>
            <v-flex xs12 md8 offset-md2>
							<div>
								<h1 class="warna__title">{{ item.name }}</h1>
								<div class="warna__description">Climate: {{ item.climate }}</div>
								<div class="warna__description">Terrain: {{ item.terrain }}</div>
								<div class="warna__description">Surface Water: {{ item.surface_water }}</div>
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
	name: "locations_detail",
	layout: "main",
  async asyncData({ store, params, error }) {
		let slug = params.slug
		let item
    let result
    let breadcrumb
    breadcrumb = { '/locations': 'Locations' }
    item = store.state.locations.find((o) => o.id === slug)
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
      locations: null
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>
