var express = require('express');
var router = express.Router();
var path = require("path")

/* GET home page. */

router.use('/views', express.static(path.join(__dirname, '/views')))
// router.use('/public', express.static(path.join(__dirname, '/public  ')))
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/home.html"))
});
router.get('/signin', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/signin.html"))
});
router.get('/signup', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/signup.html"))
});
router.get('/admin', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/loginAdmin.html"))
});
router.get('/menu', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/menu.html"))
});
router.get('/experience', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/experience.html"))
});
router.get('/add', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../views/add.html"))
});

router.use(express.urlencoded());

module.exports = router;