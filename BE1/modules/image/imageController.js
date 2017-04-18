const fs = require('fs');
var fetchimageInfoCollection =() =>{
var imageInfoCollection = [];
try{
var contents = fs.readFileSync('imageData.json','utf-8');

imageInfoCollection = JSON.parse(contents);
}catch (e){
console.log(e);
}
return imageInfoCollection;
}
var saveimageInfoCollection =(data) =>{
  fs.writeFileSync('imageData.json', JSON.stringify(data));
}
var imageByName = (name) => {
  var imageInfoCollection = fetchimageInfoCollection();
  var imageName = [];
  imageInfoCollection.forEach((data) => {
    if (data.name === name){
      imageName.push(data);
    }
  })
  return imageName;
}
var deleteImage = (name) => {
  var imageInfoCollection = fetchImageCollection();
  for (var i in imageInfoCollection){
    if (data[i].name === name){
        imageInfoCollection.splice(i, 1);
    }
  }
  saveImageCollection(imageInfoCollection);
  return imageInfoCollection;
}
var updateImage = (name) => {
    var imageInfoCollection= fetchimageInfoCollection();
    imageInfoCollection.forEach((data) => {
        if (dataRequest.name == name) {
            data.imageLink = dataRequest.imageLink;
            data.description = dataRequest.description;
        }
    });
    saveimageInfoCollection(imageInfoCollection);
}
module.exports={
  fetchimageInfoCollection : fetchimageInfoCollection,
  saveimageInfoCollection : saveimageInfoCollection,
  imageByName : imageByName,
  deleteImage : deleteImage
}
