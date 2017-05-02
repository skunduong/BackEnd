const express = require('express');

const Router = express.Router();

const usersController = require('./usersController');

Router.post('/', (req, res) => {

  var userInfo = {
    username: req.body.username,
    passwork: req.body.passwork,
    avatarLink: req.body.avatarLink,
    address: req.body.address,
    email: req.body.email
  }
  console.log('post data ', req.body);
  usersController.addUser(userInfo, (err, doc) => {
    if (err) {
      console.log(err);
      res.send("Co loi xay ra");
    } else {
      res.send("Sucsses")
    }
  });
})

Router.get('/', (req, res) => {
  try {
    if (req.query.username) {
      var search_name = req.query.username;
      usersController.getUserByName(search_name, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.send(doc);
        }
      })
    } else if (req.query.id) {
      usersController.getUserById(req.query.id, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.send(doc);
        }
      })
    } else {
      usersController.getAllUser((err, doc) => {
        if (err) {
          console.log(err);
          res.send("Co loi xay ra check di");
        } else {
          res.send(doc);
        }
      })
    }
  } catch (e) {
    console.log(e);
  }
});


Router.put('/', (req, res) => {
  if (req.body.id) {
    var newData = {
      username: req.body.username,
      passwork: req.body.passwork,
      avatarLink: req.body.avatarLink,
      address: req.body.address,
      email: req.body.email
    }
    var result = usersController.updateUserById(req.body.id, newData);

    res.send(result);
  }
  res.send(`Don't have id`);
})

module.exports = Router;
