export const users = [
  {
    id: '1',
    email: 'test@gmail.com',
    username: 'test user',
    password: '12345',
    chat: []
  },
  {
    id: '2',
    email: 'test2@gmail.com',
    username: 'test2 user',
    password: '23456',
    chat: []
  },
]

export const chats = [
  {
    id: '1',
    name: 'first chat',
    createdAt: 1607110465663,
    users: [users[0], users[1]]
  }
]

export const messages = [
  {
    id: '1',
    createdAt: 1607110465663,
    chat: chats[0],
    message: 'this is a test message from test user',
    author: users[0]
  },
  {
    id: '2',
    createdAt: 1607110465671,
    chat: chats[0],
    message: 'this is a test message back from test2 user',
    author: users[1]
  }
]