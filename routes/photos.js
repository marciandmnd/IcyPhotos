var Photo = require('../models/Photo');
var multiparty = require('multiparty');

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
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    var name = fields['photo[name]'];
    var img = files['photo[image]'][0];
    
    Photo.create({
      name: name,
      path: img.originalFilename
    }, function(err){
      if (err) return next(err);
      res.redirect('/');
    });
  });
};

exports.download = function(req, res, next) {
  var id = req.params.id;
  Photo.findById(id, function(err, photo){
    if (err) return next(err);
    res.sendfile('https://s3-eu-west-1.amazonaws.com/icy-photo-development/' + photo.path);
  });
};