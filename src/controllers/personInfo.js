import personModel from '../models/person.js';
import * as dietModel from '../models/diet.js';
import formView from '../views/formView.js';
import statsView from '../views/statsView.js';
import dietView from '../views/dietView.js';
import mealView from '../views/mealView.js';
import mealDetailsView from '../views/mealDetailsView.js';

const processPersonInfo = function (formData, typeOfUnit) {
  personModel.calculateStats(formData, typeOfUnit);
  statsView.displayStats(personModel.state.stats);
};

const processTypeOfDiet = async function (dietData) {
  await dietModel.getMeals(dietData);
  console.log(dietModel.state);
  mealView.showMeals(dietModel.state.results);

  mealView.addHandlerShowMealDetails(processMealDetails);
};

const processMealDetails = function (mealId) {
  const selectedMeal = dietModel.getMealById(mealId);
  console.log(selectedMeal);
  mealDetailsView.showMealDetails(selectedMeal);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
  dietView.addHandlerSelectDiet(processTypeOfDiet);
};

init();
