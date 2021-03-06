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
    createdAt: String
    users: [User]
  }

  type Message {
    id: ID
    createdAt: String
    chat: Chat
    messageText: String
    author: User
  }

  type Query {
    users: [User]
    chats: [Chat]
    user(id: String!): User!
    chat(id: String!): Chat!
    chatMessages(chatId: String): [Message]
    userChats(userId: String): [Chat]
  }

  type Mutation {
    createUser(input: UserInput!): User!
    createChat(input: ChatInput!): Chat!
    addUserToChat(userId: String!, chatId: String!): Chat!
    addMessageToChat(input: MessageInput!): Message!
  }

  input UserInput {
    email: String
    username:String
    password: String
  }

  input ChatInput {
    name: String
  }

  input MessageInput {
    messageText: String
    chatId: String,
    userId: String
  }
`

export default typeDefs
