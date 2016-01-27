import React, {Component, PropTypes} from 'react'
import Geocoder from 'react-select-geocoder'

import When from './when'

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
        <div className='FromToWhen-From'>
          <Geocoder
            {...this.props}
            name='from'
            value={from}
            />
        </div>
        <div className='FromToWhen-To'>
          <Geocoder
            {...this.props}
            className='FromToWhen-To'
            name='to'
            vale={to}
            />
        </div>
        {hideWhen ||
          <When
            days={days}
            start={start}
            end={end}
            />
        }
        <div className='FromToWhen-Buttons'>
          <input
            className='FromToWhen-SubmitButton'
            type='submit'
            value={submitText || 'Search'}
            />
        </div>
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
