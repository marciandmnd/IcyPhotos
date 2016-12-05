if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const aws = require('aws-sdk');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;

const port = process.env.PORT || 8080;

const photos = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', path.join(__dirname, 'public/photos'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/basscss', express.static(__dirname + '/node_modules/basscss/css/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css/'));

app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', photos.submit);

app.get('/photo/:id/download', function(req, res){
  var s3Params = {
      Bucket: S3_BUCKET,
      Key: 'node.png'
  };
  s3.getObject(s3Params, function(err, data) {
    if (err === null) {
       res.attachment('file.ext'); // or whatever your logic needs
       res.send(data.Body);
    } else {
       res.status(500).send(err);
    }
  });
});

// get signed request for s3 photo upload
app.get('/sign-s3', (req, res) => {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3-eu-west-1.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);

module.exports = app;
