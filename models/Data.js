const mongoose = require('../config/connectDB');
var UserShema = new mongoose.Schema({
    avatar: String,
    name: String,
    describe: String
},{
    collection: "data"
});
var UserModel = mongoose.model('data', UserShema);
module.exports= UserModel;
// UserModel.create({avatar:"abc",name:"123",describe:"@@@"}).then(function (data) {
//     console.log("success");
// })