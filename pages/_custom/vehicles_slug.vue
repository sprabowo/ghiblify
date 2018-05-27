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
								<h1 class="warna__title">{{ item.name }}</h1>
								<div class="warna__description">Class: {{ item.vehicle_class }}</div>
								<div class="warna__description">Length: {{ item.length }}</div>
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
	name: "vehicles_detail",
	layout: "detail",
  async asyncData({ store, params, error }) {
		let slug = params.slug
		let item
    let result
    let breadcrumb
    breadcrumb = { '/vehicles': 'Vehicles' }
    item = store.state.vehicles.find((o) => o.id === slug)
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
      vehicles: null
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>
