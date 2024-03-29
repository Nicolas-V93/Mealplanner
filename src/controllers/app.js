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
  try {
    const { valid, error } = dietModel.validate(dietData);

    dietView.toggleError(error);
    if (!valid) return;

    dietView.showSpinner();
    await dietModel.getMeals(dietData, personModel.state.stats.goalTDEE);
    dietView.hideSpinner();
    mealView.showMeals(dietModel.state.results);
  } catch (error) {
    console.log(error);
  }
};

const processMealDetails = function (mealId) {
  const selectedMeal = dietModel.getMealById(mealId);
  mealDetailsView.showMealDetails(selectedMeal);
};

const processServings = function (currentMeal, newServings) {
  dietModel.updateServings(currentMeal, newServings);
  mealDetailsView.showMealDetails(currentMeal);
};

const processNewRecipe = async function (mealIdToReplace, dishType) {
  try {
    const newRecipe = await dietModel.getNewRecipe(dishType);
    dietModel.replaceRecipe(newRecipe, mealIdToReplace);
    mealView.showMeals(dietModel.state.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
  dietView.addHandlerSelectMealplanData(processMealplanData);
  mealView.addHandlerRefreshRecipe(processNewRecipe);
  mealView.addHandlerShowMealDetails(processMealDetails);
  mealDetailsView.addHandlerUpdateServings(processServings);
  mealDetailsView.addHandlerToggleUnit();
};

init();
