import React from 'react'
import {render} from 'react-dom'

import Form from './lib/form'

module.exports = function attach (element, options) {
  render(<Form {...options} />, element)
}
