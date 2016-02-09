import React, {Component, PropTypes} from 'react'

const daysOptions = ['M-F', 'Sat', 'Sun'].map(d => <option key={d} value={d}>{d}</option>)
const startTimeOptions = hourOptions().slice(0, -1).map(d => <option key={`start-${d.value}`} value={d.value}>{d.label}</option>)
const endTimeOptions = hourOptions().slice(1).map(d => <option key={`end-${d.value}`} value={d.value}>{d.label}</option>)

export default class When extends Component {
  static propTypes = {
    days: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number
  };

  state = {
    start: this.props.start || 7,
    end: this.props.end || 9
  };

  onStartChange (event) {
    const start = parseInt(event.target.value, 10)
    let {end} = this.state
    if (start >= end) end = start + 1
    this.setState({
      start,
      end
    })
  }

  onEndChange (event) {
    const end = parseInt(event.target.value, 10)
    let {start} = this.state
    if (end <= start) start = end - 1
    this.setState({
      start,
      end
    })
  }

  render () {
    const {days} = this.props
    const {start, end} = this.state

    return (
      <div className='FromToWhen-When'>
        <label>
          <span className='FromToWhen-Days'>On<select name='days' defaultValue={days}>{daysOptions}</select></span>
          <span className='FromToWhen-Start'>from<select name='start' value={start} onChange={input => this.onStartChange(input)}>{startTimeOptions}</select></span>
          <span className='FromToWhen-End'>to<select name='end' value={end} onChange={input => this.onEndChange(input)}>{endTimeOptions}</select></span>
        </label>
      </div>
    )
  }
}

function hourOptions () {
  var times = []
  for (var i = 0; i <= 24; i++) {
    times.push(toOption(i))
  }
  return times
}

function toOption (n) {
  var opt = {
    label: '',
    value: n
  }

  if (n > 23 || n === 0) opt.label = 'Midnight'
  else if (n > 12) opt.label = n - 12 + ':00 pm'
  else if (n === 12) opt.label = 'Noon'
  else opt.label = n + ':00 am'

  return opt
}
