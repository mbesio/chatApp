import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import express, { Request } from 'express'
import { expressjwt } from 'express-jwt'

import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'
import { PrismaClient } from '@prisma/client'
import { prismaContext } from './server/prismaContext'

export interface Context {
  prisma: PrismaClient,
  req: Request // would like to find a better type here
}

const startServer = async () => {


const port = process.env.PORT
const app = express()
const httpServer = createServer(app)


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log('req in context', req)
    return {
      myProperty: true
    }
  },
})

await apolloServer.start()

apolloServer.applyMiddleware({ app, path: '/api' })

// app.use(
//   expressjwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     credentialsRequired: false}
//   )
// )

app.get('/', (req, res) => {
  res.send('hello world')
})

httpServer.listen({ port }, () =>
console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
)
}

// const context = async ({ req }): Promise<Context> =>
//   ({
//     prisma: prismaContext.prisma,
//     req
//   })

startServer()

// app.listen({ port }, () => {
//   console.log(`🚀  Server ready at ${ port }`)
// })

// }