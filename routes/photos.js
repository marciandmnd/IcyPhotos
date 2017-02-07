var Photo = require('../models/Photo');
var multiparty = require('multiparty');
const aws = require('aws-sdk');

const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;

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
    let key = photo.path;

    var s3Params = {
      Bucket: S3_BUCKET,
      Key: key
    };

    s3.getObject(s3Params, function(err, data) {
      console.log(data);
      if (err === null) {
         res.attachment(key); // or whatever your logic needs
         res.send(data.Body);
      } else {
         res.status(500).send(err);
      }
    });

  });
};
