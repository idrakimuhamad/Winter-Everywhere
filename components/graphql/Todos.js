import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Todo from './Todo'

let Panel = styled.nav`
  font-size: 1rem;
`

let Todos = props => (
  <Query
    query={gql`
      {
        todos {
          id
          description
          completed
          modifiedDate
          createdDate
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return (
        <Panel className="panel">
          {data.todos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </Panel>
      )
    }}
  </Query>
)

export default Todos
