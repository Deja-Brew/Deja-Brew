const Sequelize = require('sequelize');

const db = require('./index.js');

const User = db.define('user', {
  nickname: Sequelize.STRING(32),
  email: Sequelize.STRING(64),
  image: Sequelize.STRING,
  phone: Sequelize.STRING,
  auth0Id: Sequelize.STRING
});

const Friend = db.define('friend', {
  name: Sequelize.STRING(32),
  phone: Sequelize.STRING
});

const BeerRating = db.define('beerRating',{
  beerId: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  beerRating: Sequelize.INTEGER
});

const BreweryRating = db.define('breweryRating',{
  breweryId: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  userRating: Sequelize.INTEGER
});

User.hasMany(Friend);
Friend.belongsTo(User);

User.hasMany(BeerRating);
BeerRating.hasMany(User);

User.hasMany(BreweryRating);
BreweryRating.hasMany(User);

module.exports = {
  User: User,
  Friend: Friend,
  BeerRating: BeerRating,
  BreweryRating: BreweryRating
}
