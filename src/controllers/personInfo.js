import personInfoView from '../views/personInfoView.js';
import personModel from '../models/person.js';

const ProcessPersonInfo = function (formData) {
  const BMR = personModel.GetBMR(formData);
  const TDEE = personModel.GetTDEE(BMR, formData.activity);
  const goalTDEE = personModel.GetGoalTDEE(TDEE, formData.goal);
  console.log(BMR, TDEE, goalTDEE);
};

const init = function () {
  personInfoView.addHandlerProcessInfo(ProcessPersonInfo);
};

init();
