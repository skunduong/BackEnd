const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var imagesModel = new Schema({
  id : {type :Number , require:true },
  name : {type :String, defaul : ''},
  imageLink : { type : String, defaul : ''},
  description : {type : String},
  views :{type :Number, defaul : 0},
  likes : [{
    likeBy: {type :Number}
  }],
  comments : [{
    comment : { type : String },
    commentBy :{ type :Number }
  }]
});

module.exports =mongoose.model('images', imagesModel);
