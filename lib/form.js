import React, {Component, PropTypes} from 'react'
import throttle from 'throttleit'

import Geocoder from './geocoder'
import search from './search'
import When from './when'

import './style.css'

export default class Form extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    boundary: PropTypes.object,
    clearable: PropTypes.bool,
    end: PropTypes.number,
    focusLatlng: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    hideWhen: PropTypes.bool,
    from: PropTypes.string,
    to: PropTypes.string,
    days: PropTypes.string,
    start: PropTypes.number,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    rateLimit: PropTypes.number,
    submitText: PropTypes.string
  };

  static defaultProps = {
    initialValues: {}
  };

  onChange (event: Object) {
    const {onChange} = this.props
    if (onChange) {
      onChange(event)
    }
  }

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
    const {apiKey, boundary, clearable, days, end, from, focusLatlng, hideWhen, rateLimit, start, submitText, to} = this.props
    const throttledLoadOptions = throttle(loadOptions, rateLimit || 500)

    return (
      <form
        className='FromToWhen'
        onChange={event => this.onChange(event)}
        onSubmit={event => this.onSubmit(event)}
        >
        <fieldset
          className='FromToWhen-From'
          >
          <Geocoder
            clearable={clearable}
            defaultValue={from}
            name='from'
            loadOptions={throttledLoadOptions}
            />
        </fieldset>
        <fieldset
          className='FromToWhen-To'
          >
          <Geocoder
            clearable={clearable}
            defaultValue={to}
            name='to'
            loadOptions={throttledLoadOptions}
            />
        </fieldset>
        {hideWhen ||
          <When
            days={days}
            start={start}
            end={end}
            />
        }
        <fieldset>
          <input
            className='FromToWhen-SubmitButton'
            type='submit'
            value={submitText || 'Search'}
            />
        </fieldset>
      </form>
    )

    function loadOptions (input) {
      return search({ apiKey, boundary, focusLatlng, input }).then(results => {
        return { options: results }
      })
    }
  }
}
