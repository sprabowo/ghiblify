import Vuex from 'vuex'
import { latestfilms, latestpeople, latestspecies, latestvehicles, latestlocations } from '~/plugins/datasource'

const createStore = () => {
	return new Vuex.Store({
		state: {
			films: null,
			locations: null,
			people: null,
			species: null,
			vehicles: null,
			bookmark: []
		},
		mutations: {
			BOOKMARK_FILMS(state, content) {
				let findbookmark = state.films.findIndex((o) => o.id === content)
				if (findbookmark !== null) {
					state.films[findbookmark]['bookmarked'] = 1
				}
			},
			UNBOOKMARK_FILMS(state, content) {
				let findbookmark = state.films.findIndex((o) => o.id === content)
				if (findbookmark !== null) {
					state.films[findbookmark]['bookmarked'] = 0
				}
			},
			REMOVE_BOOKMARK(state, content) {
				let filterbookmark = state.bookmark.filter((o) => o.id !== content)
				state.bookmark = filterbookmark
			},
			UPDATE_BOOKMARK(state, content) {
				state.bookmark.push(content)
			},
			UPDATE_FILMS(state, content) {
				state.films = content
			},
			UPDATE_LOCATIONS(state, content) {
				state.locations = content
			},
			UPDATE_PEOPLE(state, content) {
				state.people = content
			},
			UPDATE_SPECIES(state, content) {
				state.species = content
			},
			UPDATE_VEHICLES(state, content) {
				state.vehicles = content
			}
		},
		actions: {
			addListBookmark({ commit }, value) {
				commit('UPDATE_BOOKMARK', value)
			},
			removeListBookmark({ commit }, value) {
				commit('REMOVE_BOOKMARK', value)
			},
			addBookmark({ commit }, value) {
				commit('BOOKMARK_FILMS', value)
			},
			removeBookmark({ commit }, value) {
				commit('UNBOOKMARK_FILMS', value)
			},
			async nuxtClientInit({ commit }, { query, store }) {
				let [dataFilms, dataPeople, dataLocations, dataSpecies, dataVehicles] = await Promise.all([
					latestfilms(),
					latestpeople(),
					latestlocations(),
					latestspecies(),
					latestvehicles()
				])
				commit('UPDATE_FILMS', dataFilms)
				commit('UPDATE_LOCATIONS', dataLocations)
				commit('UPDATE_PEOPLE', dataPeople)
				commit('UPDATE_SPECIES', dataSpecies)
				commit('UPDATE_VEHICLES', dataVehicles)
			}
		}
	})
}

export default createStore
