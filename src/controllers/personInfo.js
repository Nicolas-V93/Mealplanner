import personModel from '../models/person.js';
import formView from '../views/formView.js';
import statsView from '../views/StatsView.js';

const processPersonInfo = function (formData) {
  const BMR = personModel.GetBMR(formData);
  const TDEE = personModel.GetTDEE(BMR, formData.activity);
  const goalTDEE = personModel.GetGoalTDEE(TDEE, formData.goal);
  showStatistics({ BMR, TDEE, goalTDEE });
};

const showStatistics = function (data) {
  statsView.displayStats(data);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
};

init();
