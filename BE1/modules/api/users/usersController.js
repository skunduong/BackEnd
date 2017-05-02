const fs = require('fs');
const usersModel = require('./usersModel');
const bcrypt = require('bcryptjs');
var addUser = (data, callback) => {
  usersModel.findOne({}).select('id').sort({
    id: -1
  }).exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);

    } else {
      var id = doc && doc.id ? doc.id += 1 : 1;
      data.id = id;
      data.passwork = bcrypt.hashSync(data.passwork, bcrypt.genSaltSync(10));
      usersModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      });
    }
  })
}

var updateUserById = (id, newData) => {
  var imageInfoCollection = fetchImageCollection();

  if (id < 1 || id > imageInfoCollection.length)
    return 'Id invalid';
  else {
    imageInfoCollection[id - 1] = newData;

    saveImageCollection(imageInfoCollection);
    return 'Success';
  }
}
var getAllUser = (callback) => {
  usersModel.find({}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}
var getUserById = (id,callback) => {
  usersModel.findOne({id:id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

var getUserByName = (username,callback) => {
  usersModel.find({"username" :{$regex: username} }, (err, doc) => {
      if (err){
        callback(err);
      } else {
        callback(null,doc);
        }
    })
  }
module.exports = {
  getAllUser,
  addUser,
  updateUserById,
  getUserById,
  getUserByName,
}
