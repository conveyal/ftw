import attach from './lib'

const div = document.createElement('div')
document.body.appendChild(div)

attach(div, {
  apiKey: process.env.MAPZEN_KEY,
  boundary: {
    country: 'USA'
  },
  clearable: false,
  focusLatlng: {lat: 39.7691, lng: -86.1570},
  submitText: 'Search',
  url: 'http://www.carfreeatoz.com/planner'
})
