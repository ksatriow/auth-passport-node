'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association 
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10)
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({
        username, password: encryptedPassword
      })
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } })
        if (!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Wrong password")
        return Promise.resolve(user)
      }
      catch (err) {
        return Promise.reject(err)
      }
    }
  };

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};