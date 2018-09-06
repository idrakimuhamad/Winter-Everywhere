export default graphql(gql`
  mutation submitRepository($repoFullName: String!) {
    submitRepository(repoFullName: $repoFullName) {
      createdAt
    }
  }
`)(props => (
  <button
    onClick={() => {
      // Mutate function passed via props
      props.mutate({
        variables: {
          repoFullName: 'apollographql/apollo-client'
        }
      })
    }}>
    Click me
  </button>
))
