export default graphql(gql`
  {
    feed(type: TOP, limit: 10) {
      repository {
        name
        owner {
          login
        }
      }
      postedBy {
        login
      }
    }
  }
`)(props => (
  <List>
    {props.data.feed.map(item => (
      <ListItem
        title={item.repository.owner.login + item.repository.name}
        subtitle={`Posted by ${item.postedBy.login}`}
      />
    ))}
  </List>
))
