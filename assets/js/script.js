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
  
    var recipeUrl = `https://api.edamam.com/search?q=${userInput}&app_id=${APIRecipeId}&app_key=${APIKeyRecipe}&from=0&to=1`;
    fetch(recipeUrl)
     .then(response => response.json())
     .then(data => { 
       console.log(data) 
       for (var i = 0; i <=data.hits.length; i++) {
         recipeContainerEl.innerHTML = `
         <h2 class="flex items-center justify-center py-1 text-2xl font-extrabold dark:text-white">"${data.hits[i].recipe.label}"</h2>
         <img class="py-2 px-4" src="${data.hits[i].recipe.image}"/>
         <p class=font-bold flex items-center justify-center>Total Calories: ${Math.floor(data.hits[i].recipe.calories)}</p>
         <p class=font-bold flex items-center justify-center>Calories per serving: ${Math.floor(data.hits[i].recipe.calories/data.hits[i].recipe.yield)}</p>
         <p class=font-bold flex items-center justify-center"><a class = "underline dark:text-white hover:text-blue-800" href="${data.hits[i].recipe.url}" target="_blank">Link to Full Recipe & Further Nutritional Information</a></p>
         `  
         }
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
 
 buttonEl.addEventListener("click", function(event) {
  event.preventDefault();
  userInput=formEl.value
  console.log(history)
  if (userInput==="") {
    return
  }else{
    history.push(userInput)
    localStorage.setItem("search-history", JSON.stringify(history))

  }
  fetchRecipe()
  searchHistory()
})


$(document).on("click", ".past-recipe", pastSearch);
function pastSearch() {
    userInput = $(this).attr("data-recipe")
    fetchRecipe()
}

//get seacrh results from local storage
function searchHistory(){
    let searchHistory = localStorage.getItem("search-history");
    if (searchHistory) {
        history = JSON.parse(searchHistory);
        console.log(history)
        dispHistory(history)
    }
}

let historyDispEl=$("#history")
//display past search results
function dispHistory(pastRecipes) {
    historyDispEl.empty()
    for (let i = 0; i < pastRecipes.length; i++) {
        const pastRecipe = pastRecipes[i];
        console.log(pastRecipe)
        historyDispEl.append($(`<button class="past-recipe btn bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded dark:hover:bg-gray-300" data-recipe="${pastRecipe}">`).text(pastRecipe));
        }
    }
searchHistory()

let ClearHistoryBtn = document.querySelector("#clear-btn")
ClearHistoryBtn.addEventListener("click", function() {
    localStorage.clear();
    historyDispEl.empty()
})