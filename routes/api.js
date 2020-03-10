var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require("bcrypt");
var saltRounds = 10;
// var path = require("path");
var sendMail = require('../config/sendMail')
var UserModel = require('../models/UserModel')
/* GET users listing. */
// router.get('/', function (req, res, next) {
//     // res.send('respond with a resource');
//     res.sendFile(path.join(__dirname, "../views/home.html"))
// });

// api đăng kí
router.post('/signup', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.findOne({
        email: email
    }).then(function (data) {
        // console.log(data);
        if (data) {
            return res.json({
                error: true,
                message: "tk đã tồn tại",
            })
        } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                // res.json(hash);
                UserModel.create({
                    email: email,
                    password: hash
                }).then(function (data) {
                    // res.json('thanh cong')
                    console.log(data);
                    if (data.length == 0) {
                        return res.json("xin hay nhap tk mk")
                    } else {
                        let token = jwt.sign({
                            id: data._id
                        }, "chienphan", {
                            expiresIn: "1h"
                        })
                        sendMail("phanchien625@gmail.com", "THƯ XÁC NHẬN", `LINK NÀY TỒN TẠI TRONG 5P, xác nhận tại<a href="${req.protocol + '://' + req.get('host')}/api/authEmail/${token}">ĐÂY</a>`)
                        return res.json({
                            error: false,
                            message: "dki tk thanh cong, vao mail de xac nhan active tk",
                            // token: token
                        })
                    }
                });
                // res.json("dki tk thanh cong, vao mail de xac nhan active tk");
                // return res.redirect('/signin')
            });
        };
    });
});

// api kích hoạt active tài khoản
router.get('/authEmail/:token', function (req, res, next) {
    let token = req.params.token;
    try {
        let decode = jwt.verify(token, "chienphan")
        UserModel.findByIdAndUpdate({
            _id: decode.id
        }, {
            $set: {
                status: 'active'
            }
        }).then(function (data) {
            // console.log(data);
            if (data) {
                return res.redirect('/signin')
            }
            res.json('token sai!')
        }).catch(function (err) {
            res.json("error")
        })
    } catch (error) {
        res.json(error)
    }
    // console.log(decode);
})

// api check active để đưcọ đăng nhập
router.post('/signin', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.find({
        email: email,
    }).then(function (data) {
        // console.log(data);
        if (data.length == 0) {
            return res.json({
                error: true,
                message: "ERROR 404! TK MK SAI"
            })
        }
        if (data[0].status === "active") {
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                    let token = jwt.sign({
                        email: data[0].email
                    }, "chienphan", {
                        expiresIn: "1d"
                    })
                    //lưu giá trị cookie về client trên server
                    res.cookie("token", token, {
                        maxAge: 24 * 1000 * 60 * 60
                    })
                    res.cookie("email", data[0].email, {
                        maxAge: 24 * 1000 * 60 * 60
                    })
                    res.cookie("token",token,{
                
                    })
                    return res.json({
                        error: false,
                        message: " Đăng nhập thành công!",
                        token: token
                    })
                } else {
                    // res == true
                    return res.json({
                        error: true,
                        message: "ERROR 404! TK MK SAI"
                    })
                }
            });
        }
        // res.json("dn thanh cmn công")
        // console.log("đăng nhập thành công=============");
        // res.redirect("/")
    })
})
// api login admin
router.post('/admin', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.find({
        email: email
    }).then(function (data) {
        // res.json(data)
        if (data.length == 0) {
            return res.json('ban can nhap tk mk ')
        }
        if (data[0].type === 3) {
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                    let token = jwt.sign({
                        email: data[0].email
                    }, "chienphan", {
                        expiresIn: "1d"
                    })
                    return res.json(token)
                }
                if (result) {
                    // res == true
                    return res.json("ERROR! TK MK  sai")
                }
            });
            alert("welcome to admin! ")
            // return res.redirect("/todolist/admin")
        }
        if (data[0].type == 1) {
            alert("ERROR 404! BẠN KHÔNG CÓ QUYỀN TRUY CẬP VÀO LIÊN KẾT NÀY")
            return res.redirect("/")
        }
    })
})

// phân trang 

//  tạo 1 api (/menu)
// router.post("/menu")
// 	UserModel.find().then(function(data){
// 		var sumPage = parseInt(data.length/5);
// 		res.json(sumPage);
// 	})
module.exports = router;