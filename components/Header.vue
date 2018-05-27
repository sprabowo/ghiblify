<template>
	<v-toolbar app height="52px" fixed inverted-scroll flat color="primary">
		<v-spacer></v-spacer>
		<v-toolbar-title><a href="/"><img src="~/assets/img/ghibli.gif" height="45px"/></a></v-toolbar-title>
		<v-spacer class="hidden-sm-and-down"></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn exact nuxt to="/" flat>Home</v-btn>
			<v-btn nuxt to="/films" flat>Films</v-btn>
			<v-btn nuxt to="/people" flat>People</v-btn>
			<v-btn nuxt to="/bookmark" flat>Bookmark</v-btn>
		</v-toolbar-items>
		<v-spacer class="hidden-sm-and-down"></v-spacer>
		<v-text-field
			flat
			solo-inverted
			placeholder="Search here"
			append-icon="search"
			class="hidden-sm-and-down"
		></v-text-field>
		<v-spacer></v-spacer>
	</v-toolbar>
</template>
