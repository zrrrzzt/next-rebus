'use strict'

export default (props) => (
  <div className='slide'>
    <h1>{props.data.title}</h1>
    <img src={props.data.image} />
    <div>{props.data.description}</div>
  </div>
)
