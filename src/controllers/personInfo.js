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

const processTypeOfDiet = async function (typeOfDiet) {
  const { recipes } = await dietModel.getMeal(typeOfDiet);
  const [meal] = recipes;
  console.log(meal);
  mealView.displayMeal(meal);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
  dietView.addHandlerSelectDiet(processTypeOfDiet);
};

init();
