import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient

}
const context : Context = {
  prisma: prisma,
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})