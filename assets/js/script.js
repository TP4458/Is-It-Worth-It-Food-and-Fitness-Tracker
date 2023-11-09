var caloriesEl = document.getElementById("#calories")
var recipeEl = document.getElementById("#recipe")
var nutritionEl = document.getElementById("#nutrition")
var photoEl = document.getElementById("#photo")

var APIKeyCalorie = "XM4s0oBD3ldwaTLv/1K7kA==BF0iO8VCTDuea6KB"
var APIKeyRecipe = "9b24c484735b73e829b7cf8917539b12"
var APIRecipeId = "b0bd96d2"

function fetchCaloriesBurned() {
    var caloriesBurnedUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${userInput}`;
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
fetchCaloriesBurned()
