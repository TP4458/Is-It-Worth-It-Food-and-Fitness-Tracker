var formEl = document.getElementById("#form");
var searchBarEl = document.getElementById("#search-bar");
var buttonEl = document.getElementById("#search");

var recipeContainerEl = document.getElementById("#container")
var caloriesEl = document.getElementById("#calories")
var recipeEl = document.getElementById("#recipe")
var nutritionEl = document.getElementById("#nutrition")
var photoEl = document.getElementById("#photo")

var APIKeyCalorie = "XM4s0oBD3ldwaTLv/1K7kA==BF0iO8VCTDuea6KB"
var APIKeyRecipe = "9b24c484735b73e829b7cf8917539b12"
var APIRecipeId = "b0bd96d2"

function fetchRecipe() {
    // User input will come from input element / event listener on button element
    // Currently hardcoded - will replace pizza with ${userInput} later on
   var recipeUrl = `https://api.edamam.com/search?q=pizza&app_id=${APIRecipeId}&app_key=${APIKeyRecipe}&from=0&to=3`;
   fetch(recipeUrl)
    .then(response => response.json())
    .then(data => { 
      console.log(data)
    })
}
fetchRecipe();

function fetchCaloriesBurned() {
    var caloriesBurnedUrl = "https://api.api-ninjas.com/v1/caloriesburned?activity=running";
    var options = {
        method: "GET",
        headers: {
            "x-api-key": APIKeyCalorie
        }
    }
    fetch(caloriesBurnedUrl, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}
fetchCaloriesBurned();
