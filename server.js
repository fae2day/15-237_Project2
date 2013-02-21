//server.js, the backend part~

var express = require("express"); // imports express
var app = express();        
var fs = require("fs");
app.use(express.bodyParser());

//global for all recipe storage
var recipeList;


// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}


function findRecipe(){

}

app.get("/listings", function(request, response){
  response.send({
    listings: listings,
    success: true
  });
});

app.post();

app.put();

app.delete();












function initServer() {
  var defaultList = "[]";
  readFile("recipes.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
}

initServer();

app.listen(8889);