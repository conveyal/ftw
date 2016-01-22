import React, {Component} from 'react'
import Select from 'react-select'

export default class Geocoder extends Component {
  state = {
    value: null
  };

  onChange (value) {
    this.setState({ value })
  }

  render () {
    return (
      <Select.Async
        autoload={false}
        cacheAsyncResults={false}
        filterOptions={false}
        minimumInput={3}
        onChange={value => this.onChange(value)}
        value={this.state.value}
        {...this.props}
        />
    )
  }
}
