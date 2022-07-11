import { API_KEY } from '../config.js';

export const getMeal = async function (typeOfDiet) {
  console.log(typeOfDiet);

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?number=1&tags=vegan&apiKey=${API_KEY}`
    );
    return await res.json();
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};
