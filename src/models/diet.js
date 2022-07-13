import { API_KEY } from '../config.js';

export const getMeal = async function (dietData) {
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

    return await res2.json();
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

//&tags=${diet}
