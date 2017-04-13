'use strict'

import React from 'react'

export default class Slide extends React.Component {
  render () {
    return <div className='slide'>
      <h1>{this.props.data.title}</h1>
      <img src={this.props.data.image} />
      <div>{this.props.data.description}</div>
    </div>
  }
}
