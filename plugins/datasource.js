const axios = require('axios')
const additionaldatafilms = require('../data/films')
const additionaldatapeople = require('../data/people')
const additionaldatalocations = require('../data/locations')
const additionaldatavehicles = require('../data/vehicles')
const additionaldataspecies = require('../data/species')

function config() {
	let apiUri = 'https://ghibliapi.herokuapp.com' 
	// dibiarkan kosong karena axios udah ada baseURL tanpa perlu full URL gapapa
  return {
		'apiLatestFilms': apiUri + '/films',
		'apiLatestPeople': apiUri + '/people',
		'apiLatestLocations': apiUri + '/locations',
		'apiLatestSpecies': apiUri + '/species',
		'apiLatestVehicles': apiUri + '/vehicles'
	}
}

export function vparam(obj) {
	let str = []
	for (let p in obj) {
    if (obj.hasOwnProperty(p) && p !== 'page') {
    	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
		}
	}
	return str.join("&")
}

function credential() {
  let options = {}
  options.baseURL = process.env.API_URL
  if (process.env.API_USERNAME !== undefined || process.env.API_PASSWORD !== undefined) {
    options.auth = {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    }
  }
  return options
}

export function httpcurl(url) {
	let options = credential()
	return axios.get(url, options)
		.then(response => response.data)
		.catch(function (error) {
			console.log(error)
		})
}

export async function latestfilms() {
  let urlapi = config()['apiLatestFilms']
  let data = await httpcurl(urlapi)
  data = data.map((o) => {
    return Object.assign({}, additionaldatafilms[o.id], { bookmarked: 0 }, o)
  })
  return (data || {})
}

export async function latestpeople() {
  let urlapi = config()['apiLatestPeople']
  let data = await httpcurl(urlapi)
  data = data.map((o) => {
    return Object.assign({}, additionaldatapeople[o.id], o)
  })
  return (data || {})
}

export async function latestlocations() {
  let urlapi = config()['apiLatestLocations']
  let data = await httpcurl(urlapi)
  data = data.map((o) => {
    return Object.assign({}, additionaldatalocations[o.id], o)
  })
  return (data || {})
}

export async function latestspecies() {
  let urlapi = config()['apiLatestSpecies']
  let data = await httpcurl(urlapi)
  data = data.map((o) => {
    return Object.assign({}, additionaldataspecies[o.id], o)
  })
  return (data || {})
}

export async function latestvehicles() {
  let urlapi = config()['apiLatestVehicles']
  let data = await httpcurl(urlapi)
  data = data.map((o) => {
    return Object.assign({}, additionaldatavehicles[o.id], o)
  })
  return (data || {})
}
