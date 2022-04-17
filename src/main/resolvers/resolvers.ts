import { users, chats, messages } from '../mocks'
import { getUserById } from '../controllers'


const resolvers = {
  Query: {
    users: () => users,
    chats: () => chats,
    user: async(_, {id}) => await getUserById(id)
  },
  User: {
    id: (user) => user.id,
    username: (user) => user.username
  }
}

export default resolvers