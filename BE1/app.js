console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const imageController= require(__dirname + '/modules/image/imageController')
var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.send('./public/index.html');
})

app.post('/image', (req, res) => {
  //doc du lieu tu file imageData
  var imageInfoCollection = imageController.fetchimageInfoCollection();
  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  //push data moi vao collection
  imageInfoCollection.push(imageInfo);
  //luu lai vao file
  imageController.saveimageInfoCollection(imageInfoCollection);
  //bao thanh cong
  res.send('Success');
})

app.get('/image', (req,res) => {
//chay http://localhost:6969/searchimage.html de show data
  var imageInfoCollection;

  if (req.query.showall === "true"){
    imageInfoCollection = imageController.fetchimageInfoCollection();
  } else {
    var name = req.query.keyword;
    imageInfoCollection = imageController.imageByName(name);
  }
  htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })

  res.send(htmlString);
})
app.put("/image", (req, res) => {
  // chua chay duoc
    var imageInfo = {
        name: req.body.name,
        imageLink: req.body.imageLink,
        description: req.body.description
    };
    imagesController.updateImage(imageInfo.name);
});
app.delete('/image', (req, res) => {
  // chua chay duoc
  var imageInfoCollection;
  if (req.query.delete === "clickDelete"){
  var name = req.query.keyworddelete;
  imageInfoCollection=imagesController.deleteImage(name);
  }
  htmlString = '';

  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  })

  res.send(htmlString);
})
//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
