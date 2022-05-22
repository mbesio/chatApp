import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'
import {getAuthedUser} from './server/authenticate'
const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: any // should try and make this a better type if possible
  user: any
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = getAuthedUser(req)
    return {
          req,
          prisma,
          user
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})