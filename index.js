import React from 'react'
import {render} from 'react-dom'

import Form from './lib/form'
import './style.css'

module.exports = function attach (element, options) {
  render(<Form {...options} />, element)
}
