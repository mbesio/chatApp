import { Context } from '../index'

export const getUserById = async (context: Context, id: string) => await context.prisma.users.findUnique({
  where: {
    id: parseInt(id)
  },
})

export const getChatById = async (context: Context, id: string) => await context.prisma.chats.findUnique({
  where: {
    id: parseInt(id)
  },
})