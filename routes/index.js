var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var inspect = require('util').inspect;
var Busboy = require('busboy');

router.get('/', function (req, res) {
    res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="file" name="filefield2"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  res.end();
});


// accept POST request on the homepage
router.post('/', function (req, res) {
  
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    try{
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('Field [' + fieldname + ']');
      // console.log("files are:",req.files);
      // console.log("data : ",req.body);
      var saveTo = path.join('.', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
      });
    }
    catch(er){
      console.log('error');
    }
    
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);

});



module.exports = router;