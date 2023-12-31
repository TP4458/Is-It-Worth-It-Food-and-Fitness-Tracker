const searchBarEl = document.getElementById("search-bar");
const buttonEl = document.querySelector("#search");
const formEl = document.querySelector("#search-bar");
const ParentContainerEl = document.getElementById("toggle-visibility");
const recipeContainerEl = document.getElementById("container");
const timeToBurnContainerEl = document.getElementById("container2");
const caloriesEl = document.getElementById("calories");
const recipeEl = document.getElementById("recipe");
const nutritionEl = document.getElementById("nutrition");
const photoEl = document.getElementById("photo");
let userInput=""
let history=[];

const APIKeyCalorie = "XM4s0oBD3ldwaTLv/1K7kA==BF0iO8VCTDuea6KB"
const APIKeyRecipe = "9b24c484735b73e829b7cf8917539b12"
const APIRecipeId = "b0bd96d2"
const APIKeyRecipeBackUp = "a0145a19c538941a9ba859a3611ae804"
const APIRecipeIdBackUp = "639c6b92"

//fetch recipe data from the API
function fetchRecipe() {
    var recipeUrl = `https://api.edamam.com/search?q=${userInput}&app_id=${APIRecipeIdBackUp}&app_key=${APIKeyRecipeBackUp}&from=0&to=1`;
    fetch(recipeUrl)
     .then(response => response.json())
     .then(data => { 
        //display elements in HTML. for loop used for future development possibilities.
       var i;
       for (i = 0; i <=data.hits.length; i++) {      
         recipeContainerEl.innerHTML = `
         <h2 class="flex items-center justify-center py-1 text-2xl font-extrabold dark:text-white">"${data.hits[i].recipe.label}"</h2>
         <img class="py-2 px-4" src="${data.hits[i].recipe.image}"/>
         <p class=font-bold flex items-center justify-center>Total Calories: ${Math.floor(data.hits[i].recipe.calories)}</p>
         <p class=font-bold flex items-center justify-center>Calories per serving: ${Math.floor(data.hits[i].recipe.calories/data.hits[i].recipe.yield)}</p>
         <p class=font-bold flex items-center justify-center"><a class = "underline dark:text-white hover:text-blue-800" href="${data.hits[i].recipe.url}" target="_blank">Link to Full Recipe & Further Nutritional Information</a></p>
         `  
         let caloriesPerServing = Math.floor(data.hits[i].recipe.calories/data.hits[i].recipe.yield)
         fetchCaloriesBurned(caloriesPerServing)
         }
     })
 }

//fetch excercise time data from the API
 fetchRecipe();
  function fetchCaloriesBurned(caloriesPerServing) {
     var caloriesBurnedUrl = "https://api.api-ninjas.com/v1/caloriesburned?activity=run";
     var options = {
         method: "GET",
         headers: {
             "x-api-key": APIKeyCalorie
         }
     }
     fetch(caloriesBurnedUrl, options)
     .then(response => response.json())
     .then(data => {
    //calculate time of excercise
    let caloriesPerHour = data[0].calories_per_hour;
    let excerciseTime = Math.trunc((caloriesPerServing / caloriesPerHour) * 60) 
    //create HTML elements
    timeToBurnContainerEl.innerHTML = `
    <h2 class="flex items-center justify-center align-center font-extrabold py-1 text-2xl dark:text-white"> You would have to walk for ${excerciseTime} minutes at a moderate pace to burn off these calories per serving!</h2>
    <i class="flex items-center justify-center fa-solid fa-clock fa-bounce text-8xl p-6 m-6"></i>
    <h1 class="flex items-center justify-center py-1 text-4xl font-extrabold dark:text-white underline decoration-solid decoration-yellow-300">Is it Worth it?</h1>
    `
     })
 }
//search button functionality
 buttonEl.addEventListener("click", function(event) {
  event.preventDefault();
  ParentContainerEl.classList.remove("invisible"); 
  userInput=formEl.value
  if (userInput==="") {
    return
  }else{
    history.push(userInput)
    localStorage.setItem("search-history", JSON.stringify(history))

  }
  fetchRecipe()
  searchHistory()
})

//click on search history functionality
$(document).on("click", ".past-recipe", pastSearch);
function pastSearch() {
    ParentContainerEl.classList.remove("invisible"); 
    userInput = $(this).attr("data-recipe")
    fetchRecipe()
}

//get seacrh results from local storage
function searchHistory(){
    let searchHistory = localStorage.getItem("search-history");
    if (searchHistory) {
        history = JSON.parse(searchHistory);
        dispHistory(history)
    }
}

//display past search results
let historyDispEl=$("#history")
function dispHistory(pastRecipes) {
    historyDispEl.empty()
    for (let i = 0; i < pastRecipes.length; i++) {
        const pastRecipe = pastRecipes[i];
        historyDispEl.append($(`<button class="past-recipe btn bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded dark:hover:bg-gray-300" data-recipe="${pastRecipe}">`).text(pastRecipe));
        }
    }
searchHistory()

//clear seach history
let ClearHistoryBtn = document.querySelector("#clear-btn")
ClearHistoryBtn.addEventListener("click", function() {
    localStorage.clear();
    historyDispEl.empty()
    history=[];
})