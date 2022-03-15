import personModel from '../models/person.js';
import formView from '../views/formView.js';
import statsView from '../views/StatsView.js';

const processPersonInfo = function (formData) {
  const BMR = personModel.getBMR(formData);
  const TDEE = personModel.getTDEE(BMR, formData.activity);
  const goalTDEE = personModel.getGoalTDEE(TDEE, formData.goal);
  showStatistics({ BMR, TDEE, goalTDEE });
};

const showStatistics = function (data) {
  data.macros = personModel.getMacros(data.goalTDEE);
  // statsView.displayStats(data);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
};

init();
