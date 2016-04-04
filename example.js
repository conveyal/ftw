import attach from './index'

const div = document.createElement('div')
document.body.appendChild(div)

attach(div, {
  apiKey: process.env.MAPZEN_KEY,
  boundary: {
    country: 'USA'
  },
  clearable: false,
  focusLatlng: {lat: 39.7691, lng: -86.1570},
  onSubmit: (query) => window.open(`http://www.carfreeatoz.com/planner?${Object.keys(query).map((q) => `${q}=${query[q]}`).join('&')}`, '_blank'),
  submitText: 'Search'
})
