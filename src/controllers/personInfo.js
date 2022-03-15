import personModel from '../models/person.js';
import formView from '../views/formView.js';
import statsView from '../views/statsView.js';

const processPersonInfo = function (formData) {
  personModel.calculateStats(formData);
  statsView.displayStats(personModel.state.stats);
};

const init = function () {
  formView.addHandlerProcessInfo(processPersonInfo);
};

init();
