//client.js the clientside service

//global for all recipe storage
var recipeList;

// addRecipe: Adds a recipe from the text fields in the html to
// the server recipeList. Resets the text fields.
function addRecipe(){
	
}

// refresh: refreshes the html; redirects to new page? may have to
// specify the "refresh" function based on what type of command
// we are executing.
function refresh(){
	// Check if the client-side version of the listings exists.
		if (recipeList === undefined) return;

}

/*
 * get(): Gets all recipes. Used for browsing recipes.
*/
function get(){
	 $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        recipeList = data.listings;
        refresh();
      }
    });
}

/*
 * getRecipe(): Gets a single recipe. Used for reading, editing, or
 * deleting a preexisting recipe.
 * NOT YET IMPLEMENTED
*/

/*
 * getRecipePage(): Gets a page of recipes. 
 * NOT YET IMPLEMENTED
*/

/*
 * add(): Adds a recipe to the recipe list.
*/
function add(){
	$.ajax({
      type: "post",
      data: {"title": title, "author": author, "description": description, 
			"ingredients": ingredients, "instructions": instructions},
      url: "/listings",
      success: function(data) { 
				listings.push({
					title: title;
					date: new Date();
					author: author;
					description: description;
					ingredients: ingredients;
					instructions: instructions;
				});
				refreshDOM();
			}
    });
}

/*
 * edit(id): Edits a preexisting recipe with the id "id".
*/
function edit(id){
	
}

/*
 * del(id): Deletes a preexisting recipe with the id "id".
*/
function del(id){
	
}

$(document).ready(function() {
	get();
});