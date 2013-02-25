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
	//hash table? or just iterate through entire array?
}

//get entire list of recipes
app.get("/recipeList", function(request, response){
  response.send({
    recipeList: recipeList,
    success: true
  });
});

//get a page of recipes (?)

//get one recipe
app.get("/recipeList/:id", function(request, response){
  var id = request.params.id;
  var item = recipeList[id];
  response.send({
    recipeList: item,
    success: (item !== undefined)
  });
});

//create new recipe
app.post("/recipeList", function(request, response) {
	console.log("posting recipe...");

	var item = {"title": request.body.title,
							"ingredients": request.body.ingredients,
							"directions": request.body.directions,
							"imageURL": request.body.imageURL};
							
	console.log(item);
							
	var successful = 
      (item.title !== undefined) &&
			(item.ingredients !== undefined) &&
			(item.directions !== undefined) &&
			(item.imageURL !== undefined);
	
	if (successful) {
    recipeList.push(item);
    writeFile("recipes.txt", JSON.stringify(recipeList));
		console.log("recipe posted!");
  } else {
    item = undefined;
		console.log("recipe posting unsuccessful.");
  }
							
	response.send({ 
    item: item,
    success: successful
  });
});

//update a recipe
app.put("/recipeList/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  var oldItem = recipeList[id];
  var item = {"title": request.body.title,
							"ingredients": request.body.ingredients,
							"directions": request.body.directions,
							"imageURL": request.body.imageURL};
							
  item.title = (item.title !== undefined) ? item.title : oldItem.title;
  item.ingredients = (item.ingredients !== undefined) ? 
		item.ingredients : oldItem.ingredients;
	item.directions = (item.directions !== undefined) ? 
		item.directions : oldItem.directions;

  // commit the update
  recipeList[id] = item;

  response.send({
    item: item,
    success: true
  });
	
});

//delete a recipe
app.delete("/recipeList/:id", function(request, response){
  var id = request.params.id;
  var old = recipeList[id];
  recipeList.splice(id, 1);
  writeFile("recipes.txt", JSON.stringify(recipeList));
  response.send({
    recipeList: old,
    success: (old !== undefined)
  });
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

function initServer() {
  var defaultList = "[]";
  readFile("recipes.txt", defaultList, function(err, data) {
    recipeList = JSON.parse(data);
  });
}

initServer();
app.listen(8889);