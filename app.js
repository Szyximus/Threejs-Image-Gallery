//requiring path and fs modules
const path = require('path');
const fs = require('fs');
var photos = [];
var pattern="(\.jpg$)|(\.png$)|(\.jpeg$)";
var jsonPhotos;
//joining path of directory 
const directoryPath = path.join(__dirname, './photos');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all image files files using forEach
    files.forEach(function (file) {
        //filtering images
        if (file.match(pattern)){ photos.push(file);}      
    });
    jsonPhotos = JSON.stringify(photos);
    console.log(jsonPhotos);
    //save json file with photos filenames
    fs.writeFile('photos.json', JSON.stringify(photos), (err) => {
        if (err) throw err
        console.log('The photo list file has been saved!')
      })

});

var static = require('node-static');
var file = new static.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 3000);


//var connect = require('connect');
//var serveStatic = require('serve-static');
//connect().use(serveStatic(__dirname)).listen(8080, function(){
 //   console.log('Server running on 8080...');
//});