<template>
	<v-app>
		<v-navigation-drawer
		 	class="hidden-md-and-up"
      temporary
			fixed
      absolute
      v-model="drawer"
			color="primary"
			width="200"
    >
			<v-list>
				<v-list-tile>
					<v-list-tile-content mx-2>
						<img src="~/assets/img/ghibli.gif" height="45px"/>
          </v-list-tile-content>
				</v-list-tile>
			</v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/"><v-icon>home</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/">Home</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/films"><v-icon>movie</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/films">Films</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/people"><v-icon>people</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/people">People</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/bookmark"><v-icon>bookmark</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/bookmark">Bookmark</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
		<v-toolbar app height="52px" fixed inverted-scroll flat color="primary">
		<v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="drawer = !drawer" />
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
		<!-- <my-header /> -->
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
	data() {
		return {
			drawer: false
		}
	},
	components: {
		MyHeader: MyHeader
	}
}
</script>

