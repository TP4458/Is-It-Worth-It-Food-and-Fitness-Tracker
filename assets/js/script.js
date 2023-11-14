const searchBarEl = document.getElementById("search-bar");
const buttonEl = document.querySelector("#search");
const formEl = document.querySelector("#search-bar");
const recipeContainerEl = document.getElementById("container")
const caloriesEl = document.getElementById("calories")
const recipeEl = document.getElementById("recipe")
const nutritionEl = document.getElementById("nutrition")
const photoEl = document.getElementById("photo")
let userInput=""
let history=[];

const APIKeyCalorie = "XM4s0oBD3ldwaTLv/1K7kA==BF0iO8VCTDuea6KB"
const APIKeyRecipe = "9b24c484735b73e829b7cf8917539b12"
const APIRecipeId = "b0bd96d2"

function fetchRecipe() {
  
    var recipeUrl = `https://api.edamam.com/search?q=${userInput}&app_id=${APIRecipeId}&app_key=${APIKeyRecipe}&from=0&to=3`;
    fetch(recipeUrl)
     .then(response => response.json())
     .then(data => { 
       console.log(data) 
       for (var i = 0; i <=data.hits.length; i++) {
         recipeContainerEl.innerHTML = `
         <img src="${data.hits[i].recipe.image}"/>;
         <p>Calories: ${data.hits[i].recipe.calories}</p>;
         <p><a href="${data.hits[i].recipe.url}">Link to Full Recipe</a></p>
         `  
         }
     })
 }

//  <p>Calories: $data.hits[i].recipe.calories/$data.hits[i].recipe.yield</p>; to get portion size? 
// Use Math.Floor also? Curly brackets removed from above statement to full commenting functionality

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
 
 buttonEl.addEventListener("click", function(event) {
   event.preventDefault();
   userInput=formEl.value
   console.log(userInput)
 
   if (userInput==="") {
     return
   }else{
     history.push(userInput)
     console.log(history)
     localStorage.setItem("search-history", JSON.stringify(userInput))
     fetchRecipe(userInput)
   }
 
 })
 
