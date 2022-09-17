import { API_KEY, MAX_MEALS } from '../config.js';
import { getJSON, roundHalf } from '../helpers.js';

export const state = {
  results: [],
  amountOfMeals: 0,
  diet: '',
  caloriesPerMeal: 0,
};

const mealTypes = [
  { breakfast: ['breakfast'] },
  { lunch: ['main course', 'side dish', 'salad', 'appetizer'] },
  { dinner: ['main course', 'salad'] },
  { snack: ['snack'] },
];

export const getMeals = async function (dietData, goalTDEE) {
  const { amountOfMeals, diet } = dietData;

  state.results = [];
  state.amountOfMeals = amountOfMeals;
  state.diet = diet;
  state.caloriesPerMeal = goalTDEE / state.amountOfMeals;

  const mealIds = await retrieveMealIds();

  try {
    const data = await getJSON(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${mealIds.join()}&includeNutrition=true&apiKey=${API_KEY}`
    );

    data.forEach((meal, index) => {
      const dishType = Object.keys(mealTypes[index] || mealTypes.at(-1)).pop();
      const obj = createMealObject(meal, dishType);
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
  if (!isFinite(data.amountOfMeals) || data.amountOfMeals > MAX_MEALS) {
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

export const getNewRecipe = async function (dishType) {
  try {
    const { recipes } = await getMealByDishType(dishType);

    const newMealWithNutritionData = await getJSON(
      `https://api.spoonacular.com/recipes/${
        recipes.at(0).id
      }/information?includeNutrition=true&apiKey=${API_KEY}`
    );

    return createMealObject(newMealWithNutritionData, dishType);
  } catch (err) {
    console.log(err);
  }
};

export const replaceRecipe = function (newRecipe, mealId) {
  const index = state.results.findIndex(meal => meal.id === +mealId);
  state.results.splice(index, 1, newRecipe);
};

// Private functions

const retrieveMealIds = async function () {
  const mealIds = [];

  for (let i = 0; i < state.amountOfMeals; i++) {
    let [dishType] = Object.keys(mealTypes[i] || mealTypes.at(-1));
    const { recipes } = await getMealByDishType(dishType);
    mealIds.push(recipes.at(0).id);
  }

  return mealIds;
};

const getMealByDishType = async function (dishType) {
  // vegan breakfast returns 0 results, so take last element (snack) instead
  if ((state.diet === 'vegan' && dishType === 'breakfast') || !dishType) {
    return await getRandomRecipes(1, mealTypes.at(-1));
  }

  // select random value from array

  const arr = mealTypes.find(el => el[dishType]);
  const values = arr[dishType];
  const randomNum = Math.floor(Math.random() * values.length);
  return await getRandomRecipes(1, values[randomNum]);
};

function createMealObject(meal, dishType) {
  const calories = meal.nutrition.nutrients.find(n => n.name === 'Calories');
  const fats = meal.nutrition.nutrients.find(n => n.name === 'Fat');
  const carbs = meal.nutrition.nutrients.find(n => n.name === 'Carbohydrates');
  const protein = meal.nutrition.nutrients.find(n => n.name === 'Protein');

  return {
    id: meal.id,
    dishType,
    title: meal.title,
    image: meal.image,
    readyInMinutes: meal.readyInMinutes,
    servings: meal.servings,
    nutrients: [
      {
        name: calories.name,
        perServing: calories.amount,
        total: calculateTotal(calories.amount, true),
        unit: calories.unit,
      },
      {
        name: fats.name,
        perServing: fats.amount,
        total: calculateTotal(fats.amount),
        unit: fats.unit,
      },
      {
        name: carbs.name,
        perServing: carbs.amount,
        total: calculateTotal(carbs.amount),
        unit: carbs.unit,
      },
      {
        name: protein.name,
        perServing: protein.amount,
        total: calculateTotal(protein.amount),
        unit: protein.unit,
      },
    ],
    extendedIngredients: meal.extendedIngredients,
    instructions: meal.instructions,
  };
}

const getRandomRecipes = async function (amount, dishType) {
  try {
    const tags =
      state.diet === 'all'
        ? `&tags=${dishType}`
        : `&tags=${state.diet},${dishType}`;

    return await getJSON(
      `https://api.spoonacular.com/recipes/random?number=${amount}${tags}&apiKey=${API_KEY}`
    );
  } catch (err) {
    console.log(err);
  }
};

const calculateTotal = function (amountPerServing, isCalories = false) {
  const servings = roundHalf(state.caloriesPerMeal / amountPerServing);
  const amount = (servings * amountPerServing).toFixed(2);

  if (!isCalories) return { amount };
  return { amount, servings };
};
