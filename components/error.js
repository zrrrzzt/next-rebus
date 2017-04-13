'use strict'

import React from 'react'

export default class Errors extends React.Component {
  render () {
    return <div className='errors'>
      {this.props.error}
    </div>
  }
}
