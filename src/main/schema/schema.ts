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
    user(id: String!): User!
    chat(id: String!): Chat!
    chatMessages(chatId: String): [Message]
  }

  type Mutation {
    createUser(input: UserInput!): User!
    addUserToChat(userId: String!, chatId: String!): Chat!
    addMessageToChat(input: MessageInput!): Message!
  }

  input UserInput {
    email: String
    username:String
    password: String
  }

  input MessageInput {
    message: String
    chatId: String,
    userId: String
  }
`

export default typeDefs
