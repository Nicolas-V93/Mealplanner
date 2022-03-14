import personInfoView from '../views/personInfoView.js';
import PersonData from '../models/person.js';

const controllerProcessPersonInfo = function (formData) {
  const person = new PersonData();
  const BMR = person.calculateTDEE(formData);
  console.log(BMR);
};

const init = function () {
  personInfoView.addHandlerProcessInfo(controllerProcessPersonInfo);
};

init();
