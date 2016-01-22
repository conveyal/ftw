import fetch from 'isomorphic-fetch'
import qs from 'qs'

const searchUrl = 'https://search.mapzen.com/v1/search'

export default function search ({ apiKey, boundary, focusLatlng, input }) {
  if (!input) return Promise.resolve([])

  const query = {
    api_key: apiKey,
    'focus.point.lat': focusLatlng.lat,
    'focus.point.lon': focusLatlng.lng,
    text: input
  }

  if (boundary) {
    if (boundary.country) query['boundary.country'] = boundary.country
    if (boundary.rect) {
      query['boundary.rect.min_lat'] = boundary.rect.min_lat
      query['boundary.rect.min_lon'] = boundary.rect.min_lon
      query['boundary.rect.max_lat'] = boundary.rect.max_lat
      query['boundary.rect.max_lon'] = boundary.rect.max_lon
    }
    if (boundary.circle) {
      query['boundary.circle.lat'] = boundary.circle.lat
      query['boundary.circle.lon'] = boundary.circle.lon
      query['boundary.circle.radius'] = boundary.circle.radius
    }
  }

  return fetch(`${searchUrl}?${qs.stringify(query)}`)
    .then(res => res.json())
    .then(json => {
      if (!json || !json.features) {
        throw new Error('No features found.')
      }

      return json.features.map(({ geometry, properties }) => {
        return {
          label: properties.label,
          value: geometry.coordinates.join(',')
        }
      })
    })
    .catch(err => {
      console.log(err)
      return err
    })
}
