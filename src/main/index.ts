import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: any // should try and make this a better type if possible
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    prisma
  }),
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})