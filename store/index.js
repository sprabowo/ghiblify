import Vuex from 'vuex'
import { latestfilms, latestpeople, latestspecies, latestvehicles, latestlocations } from '~/plugins/datasource'

const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const keyCache = 'ghiblify::wp::'

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
				let dataFilms 
				let dataPeople 
				let dataLocations 
				let dataSpecies 
				let dataVehicles

				dataFilms = myCache.get(keyCache + 'dataFilms')
				dataPeople = myCache.get(keyCache + 'dataPeople')
				dataLocations = myCache.get(keyCache + 'dataLocations')
				dataSpecies = myCache.get(keyCache + 'dataSpecies')
				dataVehicles = myCache.get(keyCache + 'dataVehicles')

				if ((process.server || process.client) && !query.cache && 
					dataFilms !== undefined &&
					dataPeople !== undefined &&
					dataLocations !== undefined &&
					dataSpecies !== undefined &&
					dataVehicles !== undefined
				) {
					
				} else {
					[dataFilms, dataPeople, dataLocations, dataSpecies, dataVehicles] = await Promise.all([
						latestfilms(),
						latestpeople(),
						latestlocations(),
						latestspecies(),
						latestvehicles()
					])
					if (
					myCache.set(keyCache + 'dataFilms', dataFilms) &&
					myCache.set(keyCache + 'dataLocations', dataLocations) &&
					myCache.set(keyCache + 'dataPeople', dataPeople) &&
					myCache.set(keyCache + 'dataSpecies', dataSpecies) &&
					myCache.set(keyCache + 'dataVehicles', dataVehicles)
					) {
					//   console.log('melawan arus')
					}
				}
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
