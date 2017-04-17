'use strict'

export default (props) => (
  <div className='letters'>
    Bokstaver: {props.letters.join(', ')}
  </div>
)
