const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const db = new Sequelize(process.env.DB_URL, {
    pool: {
      max: 1,
      min: 0,
      idle: 10000
    }
  }
);

const User = db.define('user', {
  nickname: Sequelize.STRING(32),
  email: Sequelize.STRING(64),
  phone: Sequelize.STRING
});

const Friend = db.define('friend', {
  name: Sequelize.STRING(32),
  phone: Sequelize.STRING
});

User.hasMany(Friend);
Friend.belongsTo(User);

db.authenticate()
  .then(() => User.sync())
  .then(() => Friend.sync())
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })

module.exports = {
  db: db,
  User: User,
  Friend: Friend
}
