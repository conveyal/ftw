import debounce from 'debounce'
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
    debounceRate: PropTypes.number,
    focusLatlng: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string
  };

  onSubmit (event: Object) {
    event.preventDefault()

    const {elements} = event.target
    const {onSubmit} = this.props
    const query = {}

    for (let i = 0; i < elements.length; i++) {
      const e = elements[i]
      if (e.name && e.value) {
        query[e.name] = e.value
      }
    }

    onSubmit(query)
  }

  render (): Object {
    const { apiKey, boundary, clearable, debounceRate, focusLatlng, submitText } = this.props
    const loadOptions = debounce(input => {
      return search({ apiKey, boundary, focusLatlng, input }).then(results => {
        return { options: results }
      })
    }, debounceRate || 500)

    return (
      <form
        className='FromToWhen'
        onSubmit={event => this.onSubmit(event)}
        >
        <fieldset
          className='FromToWhen-From'
          >
          <Geocoder
            clearable={clearable}
            name='from'
            loadOptions={loadOptions}
            />
        </fieldset>
        <fieldset
          className='FromToWhen-To'
          >
          <Geocoder
            clearable={clearable}
            name='to'
            loadOptions={loadOptions}
            />
        </fieldset>
        <When />
        <fieldset>
          <input
            className='FromToWhen-SubmitButton'
            type='submit' value={submitText || 'Search'}
            />
        </fieldset>
      </form>
    )
  }
}
