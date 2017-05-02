const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-type-email');
var usersModel = new Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwork: {
    type: String,
    required: true,
    unique: true
  },
  avatarLink: {
    type: String,
    defaul: ''
  },
  address: {
    type: String,
    defaul: ''
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  }
});

module.exports = mongoose.model('users', usersModel);
