const mongoose = require('../config/connectDB');
var UserShema = new mongoose.Schema({
    email: String,
    password: String,
    status:{
        type: String,
        default: 'null'
    },
    type: {
        type: Number,
        default: 1
    }
},{
    collection: "user"
});
var UserModel = mongoose.model('user', UserShema);
module.exports= UserModel;
// UserModel.updateOne({email:"phanchien625@gmail.com"},{status:'active', type:1}).then(function (data) {
//     console.log(data);
    
// })
// UserModel.create({
//     email:"chien2000@gmail.com",
//     password:"310820",
    // status:{
    //     type: String,
    //     default: 'active'
    // },
    // type: {
    //     type: Number,
    //     default: 3
    // }

// }).then(function (data) {
// console.log("success");
// })