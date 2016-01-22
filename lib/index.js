import React from 'react'
import {render} from 'react-dom'

import Form from './form'

module.exports = function attach (element, options) {
  render(<Form {...options} />, element)
}
