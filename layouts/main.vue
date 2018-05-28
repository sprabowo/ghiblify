<template>
	<v-app>
		<v-dialog
			v-model="dialog"
			fullscreen
			hide-overlay
			transition="fade-transition"
			scrollable
		>
			<v-layout row wrap>
				<div class="hidden-md-and-up input-group input-group--prepend-icon input-group--solo input-group--solo-inverted elevation-0 input-group--text-field input-group--single-line primary--text">
					<v-autocomplete :input-attrs="{ class: 'on__popup on__border__bawah', placeholder: 'I want to search...', tabindex: '0', 'aria-label': 'Search' }" :min-len="0" :auto-select-one-item="false" :items="items" v-model="item" :get-label="getLabel2" :component-item='template' @update-items="updateItems">
					</v-autocomplete>
					<!-- <div class="input-group__input"> -->
						<!-- <input tabindex="0" aria-label="Search" type="text"> -->
					<!-- <i aria-hidden="true" class="inside__input__2 icon material-icons input-group__prepend-icon">search</i> -->
					<v-icon class="hidden-md-and-up inside__input__2" color="grey lighten-2">
						search
					</v-icon>
					<v-icon class="hidden-md-and-up inside__input__3" @click.stop="dialog = false">
						keyboard_arrow_left
					</v-icon>
					<v-icon class="hidden-md-and-up inside__input__4" @click.stop="item = ''">
						close
					</v-icon>
					<!-- <i aria-hidden="true" v-on:click="dialog = true" class="inside__input__3 icon material-icons input-group__prepend-icon">keyboard_arrow_left</i> -->
					<!-- </div> -->
					<div class="input-group__details">
					</div>
				</div>
			</v-layout>
		</v-dialog>
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
					<nuxt-link to="/vehicles"><v-icon>directions_boat</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/vehicles">Vehicles</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/locations"><v-icon>map</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/locations">Locations</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile text-xs-center>
					<v-list-tile-action>
					<nuxt-link to="/species"><v-icon>pets</v-icon></nuxt-link>
					</v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link to="/species">Species</nuxt-link></v-list-tile-title>
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
		<div class="mr-3 hidden-sm-and-down input-group input-group--prepend-icon input-group--solo input-group--solo-inverted elevation-0 input-group--text-field input-group--single-line primary--text">
			<v-autocomplete :input-attrs="{ placeholder: 'I want to search...', tabindex: '0', 'aria-label': 'Search' }" :min-len="0" :auto-select-one-item="false" :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
			</v-autocomplete>
			<!-- <div class="input-group__input"> -->
				<!-- <input tabindex="0" aria-label="Search" type="text"> -->
			<i aria-hidden="true" class="inside__input icon material-icons input-group__prepend-icon">search</i>
			<!-- </div> -->
			<div class="input-group__details">
			</div>
		</div>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn exact nuxt to="/" flat>Home</v-btn>
			<v-btn nuxt to="/films" flat>Films</v-btn>
			<v-btn nuxt to="/people" flat>People</v-btn>
			<v-btn nuxt to="/bookmark" flat>Bookmark</v-btn>
		</v-toolbar-items>
		<v-spacer class="hidden-sm-and-down"></v-spacer>
		<v-spacer class="hidden-md-and-up"></v-spacer>
		<v-icon class="hidden-md-and-up" @click.stop="dialog = true">
			search
		</v-icon>
		<!-- <v-text-field
			flat
			solo-inverted
			placeholder="Search here"
			append-icon="search"
			class="hidden-sm-and-down"
		></v-text-field> -->
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
import ItemTemplate from '~/components/ItemTemplate'
import dataSearch from '@/data/search.js'

export default {
	methods: {
		getLabel(item) {
      if (item) {
				this.$router.replace('/' + item.category + '/' + item.id)
      }
      return ''
    },
		getLabel2(item) {
      if (item) {
				this.$router.replace('/' + item.category + '/' + item.id)
				this.dialog = false
      }
      return ''
    },
    updateItems(t) {
      this.items = []
			let dataItem = dataSearch
      if (dataItem !== null) {
        this.items = dataItem.filter((o) => {
          return (new RegExp(t.toLowerCase())).test(o['title'].toLowerCase())
        }).splice(0, 3)
      }
    }
	},
	watch: {
		$route (to, from) {
		}
	},
	data() {
		return {
			dialog: false,
			drawer: false,
			items: [],
			item: null,
			template: ItemTemplate
		}
	},
	components: {
		MyHeader: MyHeader
	}
}
</script>
