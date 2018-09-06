import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import styled from 'styled-components'
import Todos from './Todos'

let client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

let Navbar = styled.nav`
  background-color: #fff;
  min-height: 3.25rem;
  position: relative;
  z-index: 30;
`
let NavbarBrand = styled.div`
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
`
let NavbarItem = styled.a`
  align-items: center;
  display: flex;
  color: #4a4a4a;
  line-height: 1.5;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0.5rem 0.75rem;
  position: relative;
  text-decoration: none;
`
let Container = styled.div`
  margin: 0 auto;
  position: relative;

  @media screen and (min-width: 1280px) {
    max-width: 1152px;
    width: 1152px;
  }

  @media screen and (min-width: 1088px) {
    max-width: 960px;
    width: 960px;
  }
`

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Navbar
            className="navbar"
            aria-label="main navigation">
            <NavbarBrand className="navbar-brand">
              <NavbarItem
                className="navbar-item"
                href="/">
                GraphQL Todo
              </NavbarItem>
            </NavbarBrand>
          </Navbar>
          <Container className="container">
            <div className="todos">
              <Todos />
            </div>
          </Container>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
