<template>
	<v-layout row mb-3>
		<v-flex xs12 md8 offset-md2>
			<nuxt-link class="breadcrumb" to="/">Home</nuxt-link> 
			<v-icon v-if="dataContent">keyboard_arrow_right</v-icon>
			<nuxt-link :key="i" v-for="(item, i) in dataContent" class="breadcrumb" :to="i">{{ item }}</nuxt-link>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
  props: ['dataContent']
}
</script>
