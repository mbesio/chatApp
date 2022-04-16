import { Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number
  declare username: number
  declare email: number
  declare password: number
}

export class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: number
  declare name: string
  declare createdAt: number
  declare users: number[]
}

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare id: number
  declare createdAt: number
  declare message: string
  declare chatId: number
  declare userId: number
}