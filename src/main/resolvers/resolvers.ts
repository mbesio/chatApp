// import { users, chats, messages } from '../mocks'
// import { addMessageToChat, addUserToChat, createChat, createUser, getAllChats, getAllMessagesFromChat, getAllUsers, getChatsById, getUserById } from '../controllers'
import { Context } from '../index'


const resolvers = {
  Query: {
    users: async (__, _, context: Context) =>
      await context.prisma.users.findMany()
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
    // createUser: async(_, {email, username, password}) => await createUser(email, username, password),
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