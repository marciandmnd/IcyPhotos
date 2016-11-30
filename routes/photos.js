var Photo = require('../models/Photo');
var fs = require('fs');

exports.list = function (req, res, next) {
  // console.log(req.query.test);
  Photo.find({}, function(err, photos){
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  });    
};

exports.form = function(req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  });
};

exports.submit = function(req, res, next) {
  var img = req.file
  var name = req.file.originalname || img.name;
  Photo.create({
    name: name,
    path: img.filename

  }, function(err){
    if (err) return next(err);
    res.redirect('/');
  });
};