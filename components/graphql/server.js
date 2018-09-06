let express = require('express'),
  restify = require('restify'),
  corsMiddleware = require('restify-cors-middleware'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  expressGq = require('express-graphql'),
  {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean
  } = require('graphql'),
  GraphQLDate = require('graphql-date'),
  Todos = require('./models/todo'),
  port = parseInt(process.env.PORT, 10) || 4000

// connect to the DB
mongoose.connect(
  'mongodb://usernmae:password@db-uri.mlab.com:57901/graphql',
  { useNewUrlParser: true }
)
mongoose.connection.once('open', () =>
  console.log('Connected to DB')
)

// body parser
let parseJson = bodyParser.json()

// API
let getTodo = id =>
  Todos.findById(id, (err, res) => res)
let getTodos = _ =>
  Todos.find({}, (err, res) => res)
let getCompletedTodo = _ =>
  Todos.find(
    { completed: true },
    (err, res) => res
  )
let addTodo = description => {
  let todo = new Todos({
    description: description || 'a todo',
    completed: false,
    createdDate: new Date(),
    modifiedDate: new Date()
  })

  return todo.save()
}
let updateTodo = (id, options) =>
  Todos.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...options,
        modifiedDate: new Date()
      }
    },
    { new: true }
  )
let removeTodo = id =>
  Todos.deleteOne({ _id: id }, err => {})

// GRAPHQL Types definition

// Todo type
let todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'A todo item',
  fields: {
    id: {
      type: GraphQLID
    },
    description: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    },
    createdDate: {
      type: GraphQLDate
    },
    modifiedDate: {
      type: GraphQLDate
    }
  }
})

// Query type
let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todo: {
      type: todoType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (_, { id }) => getTodo(id)
    },
    completedTodos: {
      type: new GraphQLList(todoType),
      resolve: _ => getCompletedTodo()
    },
    todos: {
      type: new GraphQLList(todoType),
      resolve: _ => getTodos()
    }
  }
})

// Mutation type
let mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodo: {
      type: todoType,
      args: {
        description: {
          type: GraphQLString
        }
      },
      resolve: (_, { description }) =>
        addTodo(description)
    },
    updateTodo: {
      type: todoType,
      args: {
        id: {
          type: GraphQLID
        },
        description: {
          type: GraphQLString
        },
        completed: {
          type: GraphQLBoolean
        }
      },
      resolve: (
        _,
        { id, description, completed }
      ) =>
        updateTodo(id, { description, completed })
    },
    deleteTodo: {
      type: todoType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (_, { id }) => removeTodo(id)
    }
  }
})

// Graphql schema
let schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

// restify it
let app = restify.createServer()

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['Access-Control-Allow-Origin'],
  exposeHeaders: ['Access-Control-Allow-Origin']
})

app.pre(cors.preflight)
app.use(cors.actual)

// wire with /graphql path to server the express graphql
app.post(
  '/graphql',
  expressGq({
    schema: schema,
    graphiql: false
  })
)

app.get(
  '/graphql',
  expressGq({
    schema: schema,
    graphiql: true
  })
)

// start the server and listen at the given port
app.listen(port, err =>
  console.log(
    `Server started at localhost:${port}`
  )
)
