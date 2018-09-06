import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Todos from './Todos'

let client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <nav
            className="navbar"
            aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                GraphQL Todo
              </a>
            </div>
          </nav>
          <div className="container">
            <div className="todos">
              <Todos />
            </div>
          </div>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
