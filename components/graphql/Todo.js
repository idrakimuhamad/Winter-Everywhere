import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

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

let PanelBlock = styled.label`
  background: #fff;
  cursor: pointer;
  align-items: center;
  color: #363636;
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 0.75em;
  border-bottom: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
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
        <PanelBlock className="panel-block has-background-white">
          <input
            type="checkbox"
            checked={completed}
            onChange={mutation}
          />
          {description}
        </PanelBlock>
      )}
    </Mutation>
  )
}

export default Todo
