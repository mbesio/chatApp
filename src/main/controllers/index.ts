// import { userModel, chatModel, messageModel } from '../models'
// import { Chat, User } from '../models/types'


// export const getAllUsers = async () => {
//   const users = await userModel.findAll()
//   if (!users) {
//     throw new Error('An error occured querying users')
//   }
//   return users
// }

// export const getUserById = async (id) => {
//   const user = await userModel.findByPk(id)
//   if (!user) {
//     throw new Error('User does not exist')
//   }
//   return user
// }

// export const getAllChats = async () => {
//   const chats = await chatModel.findAll()
//   if (!chats) {
//     throw new Error('An error occured querying chats')
//   }
//   return chats
// }

// export const getChatsById = async (id) => {
//   const chat = await chatModel.findByPk(id)
//   if (!chat) {
//     throw new Error('Chat does not exist')
//   }
//   return chat
// }

// export const getAllMessagesFromChat = async (chatId) => {
//   const messages = await messageModel.findAll({
//     where: {
//       chatId
//     }
//   })
//   if (!messages) {
//     throw new Error('An error occured retreiving messages')
//   }
//   return messages
// }

// export const createUser = async (email, username, password) => {
//   const newUser = await User.create({
//     email,
//     username,
//     password
//   })
//   if (!newUser) {
//     throw new Error('An error occured creating the user')
//   }
//   return newUser
// }

// export const createChat = async (name, users) => {
//   const newChat = await Chat.create({
//     name,
//     users,
//   })
//   if (!newChat) {
//     throw new Error('An error occured creating the chat')
//   }
//   return newChat
// }

// // need to figure out ho to update the json blob here
// export const addUserToChat = async (userId, chatId) => {
//   const chat = await chatModel.findOne({
//     where: {
//       id: chatId
//     }
//   })
//   // TO DO - check that user is not already in the chat
//   const updatedUsers = [...chat.users, userId]
//   const updatedChat = chatModel.update({users: updatedUsers}, {where: {
//     id: chatId
//   }})
//   if (!updatedChat) {
//     return new Error('There was an error adding the User to the Chat')
//   }
//   return updatedChat
// }

// export const getAllChatMessages = async (chatId) => {
//   const messages = await messageModel.findAll({where: {
//     chatId
//   }})
//   if (!messages) {
//     return new Error('There was an error retreiving the messages')
//   }
//   return messages
// }

// export const addMessageToChat = async (message, chatId, userId) => {
//   const newMessage = messageModel.create({
//     message,
//     chatId,
//     userId
//   })
//   if (!newMessage) {
//     return new Error('There was an error adding a new message to the chat')
//   }
//   return newMessage
// }