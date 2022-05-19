import { Context } from '../index'

const resolvers = {
  Query: {
    users: async (_, __, context: Context) =>
      await context.prisma.users.findMany(),
    chats: async (_, __, context: Context) =>
      await context.prisma.chats.findMany(),
    user: async (_, { id }, context: Context) =>
      await context.prisma.users.findUnique({
        where: {
          id: parseInt(id)
        },
    }),
    chat: async (_, { id }, context: Context) =>
      await context.prisma.chats.findUnique({
        where: {
          id: parseInt(id)
        },
    }),
    chatMessages: async (_, { chatId }, context: Context) =>
      await context.prisma.messages.findMany({
        where: {
          chatId: parseInt(chatId)
        },
      }),
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
    createChat: async(_, { input }, context: Context) => {
      console.log('input ', input)
      const { name } = input
      const chatExists = await context.prisma.chats.count({
        where: {
          name: name
        }
      }) > 0
      console.log('chatExists ', chatExists)
      if (chatExists) {
        throw new Error('Chat name already exists!')
      }
      return await context.prisma.chats.create({
        data: {
          name: name
        }
      })
    }
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