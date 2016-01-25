import React, {Component, PropTypes} from 'react'
import Select from 'react-select'

export default class Geocoder extends Component {
  static propTypes = {
    defaultValue: PropTypes.string
  };

  state = {
    value: this.props.defaultValue || null
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.defaultValue !== nextProps) {
      this.setState({ value: nextProps.defaultValue })
    }
  }

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
