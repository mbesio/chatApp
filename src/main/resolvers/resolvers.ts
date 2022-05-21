import jwt  from 'jsonwebtoken'
import { Context } from '../index'
import { getUserById, getChatById } from '../controllers'


const resolvers = {
  Query: {
    users: async (_, __, context: Context) =>
      await context.prisma.users.findMany(),
    chats: async (_, __, context: Context) =>
      await context.prisma.chats.findMany(),
    user: async (_, { id }, context: Context) =>
      await getUserById(context, id),
    chat: async (_, { id }, context: Context) =>
      await getChatById(context, id),
    chatMessages: async (_, { chatId }, context: Context) =>
      await context.prisma.messages.findMany({
        where: {
          chatId: parseInt(chatId)
        },
      }),
    userChats: async (_, { userId }, context: Context) => {
     const prismaChats =  await context.prisma.usersOnChats.findMany({
        where: {
          userId: parseInt(userId)
        },
      })
      const chatIds = prismaChats.map(item => item.chatId.toString())

      return await Promise.all(chatIds.map(chatId =>
        getChatById(context, chatId)
      ))
    },

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
      const newUser = await context.prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password
        }
      })
      return {
        token: jwt.sign(newUser, process.env.JWT_SECRET)
      }
    },
    loginUser: async(_, { input }, context: Context) => {
      const { username, password } = input
      const userLoggingIn = await context.prisma.users.findFirst({
        where: {
          username: username
        }
      })

      if (!userLoggingIn) throw new Error('Unable to Login')

      const isMatch = password === userLoggingIn.password
      if (!isMatch) throw  new Error('Unable to Login')
      return {
        token: jwt.sign(userLoggingIn, process.env.JWT_SECRET)
      }

    },
    createChat: async(_, { input }, context: Context) => {
      const { name } = input
      const chatExists = await context.prisma.chats.count({
        where: {
          name: name
        }
      }) > 0
      if (chatExists) {
        throw new Error('Chat name already exists!')
      }
      return await context.prisma.chats.create({
        data: {
          name: name
        }
      })
    },
    addUserToChat: async(_, { userId, chatId }, context: Context) => {
      const addedUserToChat = await context.prisma.usersOnChats.create({
        data: {
          chatId: parseInt(chatId),
          userId: parseInt(userId)
        }
      })
      const returnedChatId = addedUserToChat.chatId.toString()
      return await getChatById(context, returnedChatId)
    },
    addMessageToChat: async(_, { input }, context: Context) => {
      const { messageText, chatId, userId } = input
      return await context.prisma.messages.create({
        data: {
          messageText: messageText,
          chatId: parseInt(chatId),
          fromUser: parseInt(userId)
        }
      })
    }
  },
  User: {
    // id: (user) => user.id,
    // username: (user) => user.username,
    // email: (user) => user.email,
    // password: (user) => user.password
    chats: async (user, __, context: Context) => {
      const prismaChats = await context.prisma.usersOnChats.findMany({
        where: {
          userId: user.id
        }
      })
      const chatsId = prismaChats.map(chat => chat.chatId.toString())
      return Promise.all(chatsId.map(chatId => getChatById(context, chatId)))
    }
  },
  Chat: {
    // id: (chat) => chat.id,
    // name: (chat) => chat.name,
    users: async (chat, __, context: Context) => {
     const prismaUsers = await context.prisma.usersOnChats.findMany({
       where: {
         chatId: chat.id
       }
     })
     const usersId = prismaUsers.map(user => user.userId.toString())
     return Promise.all(usersId.map(userId => getUserById(context, userId)))
    },
  },
  Message: {
    // id: (message) => message.id,
    // message: (message) => message.message,
    chat: async (message, __, context: Context) =>
      await getChatById(context, message.chatId),
    author: async (message, __, context: Context) =>
    await getUserById(context, message.fromUser),
  }
}

export default resolvers