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
app.get("/listings", function(request, response){
  response.send({
    listings: recipeList,
    success: true
  });
});

//get a page of recipes (?)

//get one recipe
app.get("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = recipeList[id];
  response.send({
    listings: item,
    success: (item !== undefined)
  });
});

//create new recipe
app.post("/listings", function(request, response) {
	var item = {"title": request.body.title;
							"date": new Date();
							"author": request.body.author;
							"description": request.body.description;
							"ingredients": request.body.ingredients;
							"instructions": request.body.instructions};
							
	var successful = 
      (item.title !== undefined) &&
      (item.author !== undefined) &&
			(item.description !== undefined) &&
			(item.ingredients !== undefined) &&
			(item.instructions !== undefined);
	
	if (successful) {
    recipeList.push(item);
    writeFile("data.txt", JSON.stringify(listings));
  } else {
    item = undefined;
  }
							
	response.send({ 
    item: item,
    success: successful
  });
});

//update a recipe
app.put("/listings/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  var oldItem = listings[id];
  var item = {"title": request.body.title;
							"date": new Date();
							"author": request.body.author;
							"description": request.body.description;
							"ingredients": request.body.ingredients;
							"instructions": request.body.instructions};
							
  item.desc = (item.title !== undefined) ? item.title : oldItem.title;
  item.author = (item.author !== undefined) ? item.author : oldItem.author;
  item.description = (item.description !== undefined) ? item.description : oldItem.description;
  item.ingredients = (item.ingredients !== undefined) ? item.ingredients : oldItem.ingredients;
	item.instructions = (item.instructions !== undefined) ? item.instructions : oldItem.instructions;

  // commit the update
  listings[id] = item;

  response.send({
    item: item,
    success: true
  });
}););

//delete a recipe
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var old = listings[id];
  listings.splice(id, 1);
  writeFile("data.txt", JSON.stringify(listings));
  response.send({
    listings: old,
    success: (old !== undefined)
  });
});


function initServer() {
  var defaultList = "[]";
  readFile("recipes.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
}

initServer();

app.listen(8889);