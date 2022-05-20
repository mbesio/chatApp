import { Context } from '../index'

// eventually bring getUserById out to utils
const getUserById = async (context: Context, id: string) => await context.prisma.users.findUnique({
  where: {
    id: parseInt(id)
  },
})

// eventually bring getChatById out to utils
const getChatById = async (context: Context, id: string) => await context.prisma.chats.findUnique({
  where: {
    id: parseInt(id)
  },
})


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
      return await context.prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password
        }
      })
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
      console.log('hello there')
      const addedUserToChat = await context.prisma.usersOnChats.create({
        data: {
          chatId: parseInt(chatId),
          userId: parseInt(userId)
        }
      })
      console.log('addedUserToChat ', addedUserToChat)
      const returnedChatId = addedUserToChat.chatId.toString()
      return await getChatById(context, returnedChatId)
    },
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