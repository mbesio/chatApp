import typeDefs from './schema/schema'
import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},

})

export default server