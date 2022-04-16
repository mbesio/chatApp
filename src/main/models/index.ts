
import { Sequelize, DataTypes } from 'sequelize'
import { User, Chat, Message } from './types'

const  db = new Sequelize('chatApp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export const userModel = User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize: db,
  tableName: 'Users',
  timestamps: false
})


export const chatModel = Chat.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  users: {
    type: DataTypes.JSON,
    allowNull: false
  }
},{
  sequelize: db,
  tableName: 'Chats',
  timestamps: false
})

export const messageModel = Message.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  tableName: 'Messages',
  timestamps: false
})

// export const User = db.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// },{
//   timestamps: false
// })

// export const Chat = db.define('Chat', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   createdAt: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   users: {
//     type: DataTypes.JSON,
//     allowNull: false
//   }
// },{
//   timestamps: false
// })

// export const Message = db.define('Message', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   createdAt: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   message: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   chatId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// },{
//   timestamps: false
// })

db.sync({ alter: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .catch(() => {
    console.log(`Something went wrong`)
  })
