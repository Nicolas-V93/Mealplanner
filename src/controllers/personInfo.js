import personModel from '../models/person.js';
import * as dietModel from '../models/diet.js';
import formView from '../views/formView.js';
import statsView from '../views/statsView.js';
import dietView from '../views/dietView.js';
import mealView from '../views/mealView.js';
import mealDetailsView from '../views/mealDetailsView.js';

const processPersonInfo = function (formData, typeOfUnit) {
  const { valid, error } = personModel.validateForm(formData);

  if (!valid) {
    formView.showErrorMessage(error);
  } else {
    personModel.calculateStats(formData, typeOfUnit);
    statsView.displayStats(personModel.state.stats);
    formView.closeModal();
    formView.hideCta();
    dietView.showDiets();
  }
};

const processMealplanData = async function (dietData) {
  console.log(dietData);

  const { valid, error } = dietModel.validate(dietData);

  dietView.toggleError(error);
  if (!valid) return;

  await dietModel.getMeals(dietData);
  console.log(dietModel.state);
  mealView.showMeals(dietModel.state.results);

  mealView.addHandlerShowMealDetails(processMealDetails);
};

const processMealDetails = function (mealId) {
  const selectedMeal = dietModel.getMealById(mealId);
  mealDetailsView.showMealDetails(selectedMeal);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
  dietView.addHandlerSelectMealplanData(processMealplanData);
};

init();
