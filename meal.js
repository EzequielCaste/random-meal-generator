const button = document.getElementById("btn");
const meal_1 = document.getElementById("meal-1")
const meal_2 = document.getElementById("meal-2")
const url = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealImage = document.getElementById("image")
const mealCategory = document.getElementById("category")
const mealArea = document.getElementById("area")
const mealTag = document.getElementById("tags")
const mealVideo = document.getElementById("video")
const mealTitle = document.getElementById("title")
const mealDescription = document.getElementById("description")
const ingredientList = document.getElementById("ingredient-list")



function getMeal()  {
  fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    spinner.setAttribute('hidden', '');

    //setTimeout(setMealInfo ,5000,data.meals[0])
    setMealInfo(data.meals[0])
    })
}

function setMealInfo(meal) {  
  const vidString = getVidString(meal.strYoutube)
  mealImage.setAttribute("src", meal.strMealThumb)
  mealVideo.setAttribute("src", vidString)
  mealCategory.innerText = meal.strCategory
  mealArea.innerText = meal.strArea
  mealTag.innerText = meal.strTags

  getIngredientList(meal)

  mealTitle.innerText = meal.strMeal
  mealDescription.innerText = meal.strInstructions

}

function getIngredientList(meal) {
  let keyIngredient = "strIngredient";
  let keyMeasure = "strMeasure"; 

  for ( let counter = 1; meal[keyIngredient + counter] != ""; counter++) {
    // Add li element to Ingredient List
    let newLi = document.createElement("li")
    let ingredient = meal[keyIngredient + counter];
    let measure = meal[keyMeasure + counter];
    newLi.innerText = ingredient + " - " + measure
    ingredientList.appendChild(newLi)
  }  
}

function getVidString(vidStr) {
return "https://www.youtube.com/embed/" + vidStr.slice(32,45)
}


const spinner = document.getElementById("spinner");

button.addEventListener("click", function() {

  meal_1.classList.add("hidden")
  meal_2.classList.add("hidden")

  spinner.removeAttribute('hidden');
  
  getMeal();

  setTimeout(function(){
    meal_1.classList.remove("hidden")
    meal_2.classList.remove("hidden")
  }, 1000)
})



