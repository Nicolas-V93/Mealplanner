import personModel from '../models/person.js';
import * as dietModel from '../models/diet.js';
import formView from '../views/formView.js';
import statsView from '../views/statsView.js';
import dietView from '../views/dietView.js';
import mealView from '../views/mealView.js';

const processPersonInfo = function (formData, typeOfUnit) {
  personModel.calculateStats(formData, typeOfUnit);
  statsView.displayStats(personModel.state.stats);
};

const processTypeOfDiet = async function (dietData) {
  const recipes = await dietModel.getMeal(dietData);
  console.log(recipes);
  mealView.showMeals(recipes);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
  dietView.addHandlerSelectDiet(processTypeOfDiet);
};

init();
