const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage =(data) =>{
  imagesModel.create(data, (err, doc)=>{
    if(err){
      console.log(err);
    }else{
      console.log(doc);
    }
  })
}
var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json', 'utf-8');

    imageInfoCollection = JSON.parse(contents);

  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;
}

var saveImageCollection = (data) => {
  fs.writeFileSync('imageData.json', JSON.stringify(data));
}
var getAllImage = () => {
  return imagesModel.find({});
}

var getImageById = (id)=>{
  return imagesModel.findOne({_id:id});
}

var deleteImageById = (id) =>{
  return imagesModel.deleteOne({_id:id});
 }

var updateImageCollectionById = (id, newData) => {
  return imagesModel.update({_id : id}, newData);
}

module.exports = {
  fetchImageCollection,
  saveImageCollection,
  updateImageCollectionById,
  addImage,
  getAllImage,
  getImageById,
  deleteImageById
}
