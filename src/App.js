import React from 'react'
import loading_gif from './loading.gif'

class App extends React.Component {
  constructor() {
    super()
    // Initiating the State object
    this.state = {
      joke: '',
      punchLine: '',
      isLoading: false
    }
  }

  // Component Mounting Life Cycle event
  componentDidMount() {
    // Reusing the Onclick event code
    this.getJoke()
  }

  // On Click event
  getJoke = () => {
    // Modifying the State
    this.setState({
      isLoading: true,
      joke: '',
      punchLine: ''
    })
    // API call
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(data => {
        this.setState({
          joke: data.setup,
          punchLine: '',
          isLoading: false
        })
        setTimeout(() => { this.setState({ punchLine: data.punchline }) }, 4000)
      }
      )
  }

  render() {
    // Styles
    let buttonStyle = {
      backgroundColor: 'green',
      color: 'black',
      width: '200px',
      height: '50px',
      borderStyle: 'solid',
      borderColor: 'black',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: 'xx-large',
      fontWeight: 'bold'
    }
    let jokeStyle = {
      color: 'red',
      font: 'bold'
    }
    let punchStyle = {
      color: 'blue',
      font: 'bold'
    }
    let containerStyle = {
      margin: '0 auto',
      marginTop: '50px',
      textAlign: 'center'
    }

    // Conditional Rendering
    let loadingImage = ''
    if (this.state.isLoading || this.state.punchLine === '') {
      // Changing styles based on condition
      buttonStyle.backgroundColor = 'red'
      loadingImage = (<img src={loading_gif} alt="loading" style={{ width: '20', height: '15', verticalAlign: 'middle' }}></img>)
    }
    else {
      buttonStyle.backgroundColor = 'green'
      loadingImage = ''
    }
    return (
      <div style={containerStyle}>
        <button style={buttonStyle} onClick={this.getJoke} disabled={this.state.punchLine === ''}>Get a Joke!</button>
        <h1 style={jokeStyle}>{this.state.joke}</h1>
        <br />
        {loadingImage}
        <h1 style={punchStyle}>{this.state.punchLine}</h1>
      </div>
    )
  }
}

export default App