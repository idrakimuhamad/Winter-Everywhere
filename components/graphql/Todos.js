import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Todo from './Todo'

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
        <nav className="panel">
          {data.todos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </nav>
      )
    }}
  </Query>
)

export default Todos
