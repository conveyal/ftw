import React, {Component, PropTypes} from 'react'
import Geocoder from 'react-select-geocoder'

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

  render (): Object {
    const {days, end, from, hideWhen, onChange, onSubmit, start, submitText, to} = this.props

    return (
      <form
        className='FromToWhen'
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        >
        <fieldset
          className='FromToWhen-From'
          >
          <Geocoder
            {...this.props}
            name='from'
            value={from}
            />
        </fieldset>
        <fieldset
          className='FromToWhen-To'
          >
          <Geocoder
            {...this.props}
            name='to'
            vale={to}
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

    function onFormChange (event) {
      if (onChange) onChange(event)
    }

    function onFormSubmit (event) {
      event.preventDefault()
      onSubmit(serialize(event.target))
    }
  }
}

function serialize (form) {
  const {elements} = form
  const query = {}

  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (e.name && e.value) {
      query[e.name] = e.value
    }
  }

  return query
}
