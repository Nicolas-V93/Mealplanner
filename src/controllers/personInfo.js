import personInfoView from '../views/personInfoView.js';
import personModel from '../models/person.js';

const ProcessPersonInfo = function (formData) {
  const BMR = personModel.GetBMR(formData);
  const TDEE = personModel.GetTDEE(BMR, formData.activity);
  console.log(BMR, TDEE);
};

const init = function () {
  personInfoView.addHandlerProcessInfo(ProcessPersonInfo);
};

init();
