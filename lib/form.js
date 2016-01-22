import debounce from 'debounce'
import qs from 'qs'
import React, {Component, PropTypes} from 'react'

import Geocoder from './geocoder'
import search from './search'
import When from './when'

import './style.css'

export default class Form extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    boundary: PropTypes.object,
    clearable: PropTypes.bool,
    focusLatlng: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    submitText: PropTypes.string,
    url: PropTypes.string.isRequired
  };

  onSubmit (event) {
    event.preventDefault()

    const {elements} = event.target
    const {url} = this.props
    const query = {}

    for (let i = 0; i < elements.length; i++) {
      const e = elements[i]
      if (e.name && e.value) {
        query[e.name] = e.value
      }
    }

    window.open(`${url}?${qs.stringify(query)}`, '_blank')
  }

  render () {
    const { apiKey, boundary, clearable, focusLatlng, submitText } = this.props
    const loadOptions = debounce(input => {
      return search({ apiKey, boundary, focusLatlng, input }).then(results => {
        return { options: results }
      })
    })

    return (
      <form className='FromToWhen' onSubmit={event => this.onSubmit(event)}>
        <fieldset>
          <Geocoder
            clearable={clearable}
            name='from'
            loadOptions={loadOptions}
            />
        </fieldset>
        <fieldset>
          <Geocoder
            clearable={clearable}
            name='to'
            loadOptions={loadOptions}
            />
        </fieldset>
        <When />
        <fieldset>
          <input className='FromToWhen-SubmitButton' type='submit' value={submitText || 'Search'} />
        </fieldset>
      </form>
    )
  }
}
