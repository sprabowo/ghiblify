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
								<div class="warna__description">classification: {{ item.classification }}</div>
								<div class="warna__description">Hair Colors: {{ item.hair_colors }}</div>
								<div class="warna__description">Eye Colors: {{ item.eye_colors }}</div>
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
	name: "species_detail",
	layout: "detail",
  async asyncData({ store, params, error }) {
		let slug = params.slug
		let item
    let result
    let breadcrumb
    breadcrumb = { '/species': 'Species' }
    item = store.state.species.find((o) => o.id === slug)
		if (item === undefined) {
      return error({ statusCode: 404, message: '404 Not Found' })
    }
    result = {
      item: item,
      breadcrumb
    }
    return result
  },
  layout: 'main',
  data() {
    return {
      species: null
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>
