<template>
	<v-app>
		<my-header />
		<v-content>
      <v-container id="container__content">
        <nuxt />
      </v-container>
    </v-content>
	</v-app>
</template>

<script>
import MyHeader from '~/components/Header'

export default {
	components: {
		MyHeader: MyHeader
	}
}
</script>

