import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    id: ID
    email: String
    username:String
    password: String
    chats: [Chat]
  }

  type Chat {
    id: ID
    name: String
    createdAt: Int
    users: [User]
  }

  type Message {
    id: ID
    createdAt: Int
    chat: Chat
    message: String
    Author: User
  }

  type Query {
    users: [User]
    chats: [Chat]
    messages: [Message]
    user(id: String!): User!
  }
`

export default typeDefs
