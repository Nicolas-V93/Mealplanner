import personModel from '../models/person.js';
import formView from '../views/formView.js';
import statsView from '../views/statsView.js';

const processPersonInfo = function (formData, typeOfUnit) {
  personModel.calculateStats(formData, typeOfUnit);
  statsView.displayStats(personModel.state.stats);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
};

init();
