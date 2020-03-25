import React from 'react'
import { Notification } from 'react-notification'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Slide from '../components/slide'
import Letters from '../components/letters'
const data = require('../test/data/example.json')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.hideNotification = this.hideNotification.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: data,
      slide: data[0],
      index: 0,
      letters: [],
      answer: '',
      notification: {
        isActive: false,
        message: ''
      }
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
        notification: {
          isActive: true,
          message: 'Svaret var riktig! Er du klar for nye oppgaver?'
        }
      })
    } else {
      this.setState({
        notification: {
          isActive: true,
          message: 'Beklager. Det var feil. Prøv igjen'
        }
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

  hideNotification (event) {
    // event.preventDefault()
    this.setState({
      notification: {
        isActive: false,
        message: ''
      }
    })
  }

  render () {
    return (
      <div className='center'>
        <Head />
        <Container fluid>
          <Slide data={this.state.slide} />
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
          <Notification
            isActive={this.state.notification.isActive}
            message={this.state.notification.message}
            action='[X]'
            onClick={this.hideNotification}
          />
        </Container>
        <style jsx>{`
      .center {
        text-align: center;
        font-size: 2rem;
      }
    `}
        </style>
      </div>
    )
  }
}
