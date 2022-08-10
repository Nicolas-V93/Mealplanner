import { API_KEY } from '../config.js';

export const state = {
  results: [],
};

export const getMeals = async function (dietData) {
  const { amountOfMeals, diet } = dietData;
  const tags = diet === 'all' ? '' : `&tags=${diet}`;

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?number=${amountOfMeals}${tags}&apiKey=${API_KEY}`
    );

    const { recipes } = await res.json();
    const mealIds = recipes.map(r => r.id);

    const res2 = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${mealIds.join()}&includeNutrition=true&apiKey=${API_KEY}`
    );

    const data = await res2.json();
    createMealObject(data);
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const getMealById = function (mealId) {
  return state.results.find(meal => meal.id === +mealId);
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
