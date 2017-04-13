'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Slide from '../components/slide'
import Letters from '../components/letters'
import Message from '../components/message'
import Errors from '../components/error'
const data = require('../test/data/example.json')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: data,
      slide: data[0],
      index: 0,
      letters: [],
      answer: '',
      error: false,
      message: false
    }
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const answer = this.state.answer.toUpperCase()
    if (answer === this.state.slide.answer) {
      const index = this.state.index + 1
      const letters = this.state.letters
      if (this.state.slide.type === 'question') {
        letters.push(answer)
      }
      this.setState({
        slide: this.state.data[index],
        index: index,
        letters: letters,
        answer: '',
        error: false,
        message: 'Svaret var riktig! Er du klar for nye oppgaver?'
      })
    } else {
      this.setState({
        error: 'Beklager. Det var feil. Prøv igjen',
        message: false
      })
    }
  }

  handleStart (event) {
    event.preventDefault()
    const index = this.state.index + 1
    this.setState({
      slide: this.state.data[index],
      index: index
    })
  }

  render () {
    return (
      <div className='center'>
        <Head />
        <Container fluid>
          <Slide data={this.state.slide} />
          {
            this.state.error !== false ? <Errors error={this.state.error} /> : null
          }
          {
            this.state.message !== false ? <Message message={this.state.message} /> : null
          }
          {
            this.state.letters.length > 0 ? <Letters letters={this.state.letters} /> : null
          }
          {
            this.state.slide.type === 'question' ? <Form onSubmit={this.handleSubmit}>
              <Input name='answer' label='Svar' floatingLabel value={this.state.answer} onChange={this.handleChange} />
              <Button variant='raised' type='submit'>Sjekk svaret</Button>
            </Form> : null
          }
          {
            this.state.slide.type === 'start' ? <Button variant='raised' onClick={this.handleStart}>START</Button> : null
          }
        </Container>
        <style jsx>{`
      .center {
        text-align: center;
      }
    `}</style>
      </div>
    )
  }
}
