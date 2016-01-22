# ftw
From? To? When? An embeddable form that searches Mapzen for addresses and opens a new Modeify window with the from, to, and when parameters specified.

### How to use

```js
import ftw from 'ftw'

ftw(div, {
  apiKey: process.env.MAPZEN_KEY,
  boundary: { // See the parameters here: https://mapzen.com/documentation/search/search/#narrow-your-search
    country: 'USA'
  },
  clearable: false, // Show or hide the "X"
  focusLatlng: {lat: 39.7691, lng: -86.1570},
  submitText: 'Search',
  url: 'http://www.carfreeatoz.com/planner'
})
```
