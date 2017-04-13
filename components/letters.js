'use strict'

import React from 'react'

export default class Letters extends React.Component {
  render () {
    return <div className='letters'>
      Bokstaver: {this.props.letters.join(', ')}
    </div>
  }
}
