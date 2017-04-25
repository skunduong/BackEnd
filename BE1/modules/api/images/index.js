const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');

Router.post('/', (req, res) => {
  var imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }

  console.log('post data ', req.body);
  imagesController.addImage(imageInfo);
  res.send('Success');
})

Router.get('/', (req, res) => {
  try {
    if (!req.query.id && req.query.id != 0) {

      imagesController.getAllImage().then((result) => {
        res.send(result)
      });

    } else if (req.query.id) {

      imagesController.getImageById(req.query.id).then((result) => {
        res.send(result)
      });
    }
  } catch (e) {
    console.log(e);
  }
})

Router.put('/', (req, res) => {
  try {
    if (req.body.id) {
      var newData = {
        name: req.body.name,
        imageLink: req.body.imageLink,
        description: req.body.description
      }
      imagesController.updateImageCollectionById(req.body.id, newData).then((result) => {
        res.send(result)
      });
      res.send('Update Success');
    }
  } catch (e) {
    console.log(e);
  }
});

Router.delete('/', (req, res) => {
  try {
     if (req.body.id) {
         imagesController.deleteImageById(req.body.id).then((result) => {
             res.send(result);
         });
         res.send('Delete Success');
     }
 } catch (e) {
     console.log(e);
 }
});

module.exports = Router;
