export interface IGQLUser {
  id: string
  username: string
  email: string
  password: string
  chats: Array<IGQLChat>
}

export interface IGQLChat {
  id: string
  name: string
  createdAt: string
  users: Array<IGQLUser>
}

export interface IGQLMessage {
    id: string
    createdAt: number
    chat: IGQLChat
    message: string
    Author: IGQLUser
}


export interface IDBUser {
  id: number
  username: string
  email: string
  password: string
}

export interface IDBChat {
  id: number
  name: string
  createdAt: number
  users: Array<number>
}

export interface IDBMessages {
  id: number
  createdAt: number
  message: string
  chatId: number
  userId: number
}