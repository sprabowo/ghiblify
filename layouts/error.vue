<template>
	<v-app>
		<v-content>
			<v-container>
				<v-layout mt-5 v-if="error.statusCode === 404">
					<v-spacer></v-spacer>
					<v-flex text-xs-center>
						<h1>{{ error.message }}</h1>
						<p>url maybe wrong or not found</p>
					</v-flex>
					<v-spacer></v-spacer>
				</v-layout>
			</v-container>
		</v-content>
  </v-app>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
