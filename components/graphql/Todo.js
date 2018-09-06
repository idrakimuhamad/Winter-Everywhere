import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

let POST_MUTATION = gql`
  mutation updateTodo(
    $id: ID!
    $status: Boolean
    $desc: String
  ) {
    updateTodo(
      id: $id
      completed: $status
      description: $desc
    ) {
      id
      description
      completed
      modifiedDate
      createdDate
    }
  }
`

let Todo = ({ todo }) => {
  let { id, description, completed } = todo

  return (
    <Mutation
      mutation={POST_MUTATION}
      variables={{
        id,
        desc: description,
        status: !completed
      }}>
      {mutation => (
        <label className="panel-block has-background-white">
          <input
            type="checkbox"
            checked={completed}
            onChange={mutation}
          />
          {description}
        </label>
      )}
    </Mutation>
  )
}

export default Todo
