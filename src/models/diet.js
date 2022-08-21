import { API_KEY } from '../config.js';
import { getJSON } from '../helpers.js';

export const state = {
  results: [],
  amountOfMeals: 0,
  diet: '',
};

export const getMeals = async function (dietData) {
  const { amountOfMeals, diet } = dietData;

  state.results = [];
  state.amountOfMeals = amountOfMeals;
  state.diet = diet;

  const { recipes } = await getRandomRecipes(state.amountOfMeals);
  const mealIds = recipes.map(r => r.id);

  try {
    const data = await getJSON(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${mealIds.join()}&includeNutrition=true&apiKey=${API_KEY}`
    );

    data.forEach(meal => {
      const obj = createMealObject(meal);
      state.results.push(obj);
    });
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const getMealById = function (mealId) {
  return state.results.find(meal => meal.id === +mealId);
};

export const validate = function (data) {
  if (!isFinite(data.amountOfMeals)) {
    return { valid: false, error: 'Select a valid amount' };
  }

  if (!data.diet) {
    return { valid: false, error: 'Please select a diet!' };
  }
  return { valid: true };
};

export const updateServings = function (currentMeal, newServings) {
  currentMeal.extendedIngredients.forEach(ing => {
    ing.measures.metric.amount =
      (ing.measures.metric.amount * newServings) / currentMeal.servings;
    ing.measures.us.amount =
      (ing.measures.us.amount * newServings) / currentMeal.servings;
  });

  currentMeal.servings = newServings;
};

export const getNewRecipe = async function () {
  try {
    const { recipes } = await getRandomRecipes(1);

    const newMealWithNutrition = await getJSON(
      `https://api.spoonacular.com/recipes/${
        recipes.at(0).id
      }/information?includeNutrition=true&apiKey=${API_KEY}`
    );

    return createMealObject(newMealWithNutrition);
  } catch (err) {
    console.log(err);
  }
};

export const replaceRecipe = function (newRecipe, mealId) {
  const index = state.results.findIndex(meal => meal.id === +mealId);
  state.results.splice(index, 1, newRecipe);
};

// Private

const createMealObject = function (meal) {
  return {
    id: meal.id,
    title: meal.title,
    image: meal.image,
    readyInMinutes: meal.readyInMinutes,
    servings: meal.servings,
    nutrients: meal.nutrition.nutrients,
    extendedIngredients: meal.extendedIngredients,
    instructions: meal.instructions,
  };
};

const getRandomRecipes = async function (amount) {
  try {
    const tags = state.diet === 'all' ? '' : `&tags=${state.diet}`;

    return await getJSON(
      `https://api.spoonacular.com/recipes/random?number=${amount}${tags}&apiKey=${API_KEY}`
    );
  } catch (err) {
    console.log(err);
  }
};
