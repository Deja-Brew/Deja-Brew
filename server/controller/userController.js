const { User } = require('../db/dbModel.js');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const userController = {

  getAllUsers: (req, res) => {
    User.findAll()
      .then((data) => {
        res.status(200);
        res.json(data);
      })
  },

  getUserEntry: (req, res) => {
    User.findAll({
      where: { auth0Id: req.params.id }
    })
      .then((data) => {
        if (data.length) {
          res.status(200);
          res.json(data);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log('error retrieving data', err);
        res.sendStatus(404);
      })
  },

  addUserEntry: (req, res) => {
    User.findOrCreate({
      where: {
        auth0Id: req.body.auth0Id
      },
      defaults: {
        nickname: '',
        image: '',
        email: '',
        phone: ''
      }
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating new user', err);
      })
  },

  updateUserEntry: (req, res) => {
    User.update({
      nickname: req.body.nickname,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image
    }, {
      where: {
        id: req.params.id
      }
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error updating user entry', err);
        res.sendStatus(404);
      })
  },

  deleteUserEntry: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error deleting user entry', err);
        res.sendStatus(404);
      })
  }
}

module.exports = userController;
