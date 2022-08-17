import { API_KEY } from '../config.js';
import { getJSON } from '../helpers.js';

export const state = {
  results: [],
};

export const getMeals = async function (dietData) {
  const { amountOfMeals, diet } = dietData;
  const tags = diet === 'all' ? '' : `&tags=${diet}`;

  try {
    const { recipes } = await getJSON(
      `https://api.spoonacular.com/recipes/random?number=${amountOfMeals}${tags}&apiKey=${API_KEY}`
    );

    const mealIds = recipes.map(r => r.id);

    const data = await getJSON(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${mealIds.join()}&includeNutrition=true&apiKey=${API_KEY}`
    );

    createMealObject(data);
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

// Private functions

const createMealObject = function (data) {
  state.results = [];

  data.forEach(meal => {
    const obj = {
      id: meal.id,
      title: meal.title,
      image: meal.image,
      readyInMinutes: meal.readyInMinutes,
      servings: meal.servings,
      nutrients: meal.nutrition.nutrients,
      extendedIngredients: meal.extendedIngredients,
      instructions: meal.instructions,
    };

    state.results.push(obj);
  });
};
