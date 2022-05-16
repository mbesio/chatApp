// import { users, chats, messages } from '../mocks'
// import { addMessageToChat, addUserToChat, createChat, createUser, getAllChats, getAllMessagesFromChat, getAllUsers, getChatsById, getUserById } from '../controllers'
import { Context } from '../index'


const resolvers = {
  Query: {
    users: async (_, __, context: Context) =>
      await context.prisma.users.findMany(),
    chats: async (_, __, context: Context) =>
      await context.prisma.chats.findMany()
    // [{
    //   id: '1',
    //   email: 'test@gmail.com',
    //   username: 'test user'}]
    // // users: async () => await getAllUsers(),
    // user: async(_, {id}) => await getUserById(id),
    // chats: async () => await getAllChats(),
    // chat: async (_, {id}) => await getChatsById(id),
    // chatMessages: async (_, {chatId}) => await getAllMessagesFromChat(chatId)
  },
  Mutation: {
    createUser: async(_, { input }, context: Context) =>  {
      const { username, email, password } = input
      const userExists = await context.prisma.users.count({
        where: {
          username: username
        }
      }) > 0
      if (userExists) {
        throw new Error('Username already exists!')
      }
      return await context.prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password
        }
      })
    },
    // createChat: async(_, {name, users}) => await createChat(name, users),
    // createChat: async(_, {name, users}) => await createChat(name, users),
    // addUserToChat: async(_, {userId, chatId}) => await addUserToChat(userId, chatId),
    // addMessageToChat: async(_, {message, chatId, userId}) => await addMessageToChat(message, chatId, userId)
  },
  User: {
    // id: (user) => user.id,
    // username: (user) => user.username,
    // email: (user) => user.email,
    // password: (user) => user.password
  },
  Chat: {
    // id: (chat) => chat.id,
    // name: (chat) => chat.name,
    // users: async (chat) => {
    //   return await chat.users.map(userId => getUserById(userId))
    // }
  },
  Message: {
    // id: (message) => message.id,
    // message: (message) => message.message,
    // chat: async (message) => await getChatsById(message.chatId),
    // author: async (message) => await getUserById(message.userId),
  }
}

export default resolvers