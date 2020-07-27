const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ductermaster'
})

class UserServices {

  constructor() {
    this.pool = pool
    this.collection = 'usuarios'
  }

  async getUsers() {
    const users = await this.pool.query('SELECT * FROM usuarios')
    return users[0] || []
  }

  async getUsersId(idUser) {
    const user = await this.pool.query(`SELECT * FROM usuarios WHERE id=${idUser} limit 1`)
    return user[0] || {}
  }

  async createUser({ user }) {
    const { id, usuario, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)

    const createUserId = await this.pool.query(`INSERT INTO usuarios(id, usuario, password) VALUES '${id}', ${usuario}, ${hashedPassword}`)
  
    return createUserId
  }

}

  
module.exports = UserServices