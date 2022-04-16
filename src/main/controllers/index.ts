import { userModel} from '../models'
// import { User, Chat, Message } from '../models'
// import { IDBUser } from '../types'


// const getAllUsers = async () => {
//   const users = await User.findAll()
//   console.log('users ', users)
// }

export const getUserById = async (id) => {
  console.log('id', id)
  const user = await userModel.findByPk(id)
  console.log('user', user)
  if (!user) {
    throw new Error('User does not exist')
  }
  return user
}