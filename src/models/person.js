import {
  CARBS_PERCENTAGE,
  PROTEINS_PERCENTAGE,
  FATS_PERCENTAGE,
  CARBS_CALORIE_PER_GRAM,
  PROTEINS_CALORIE_PER_GRAM,
  FATS_CALORIE_PER_GRAM,
} from '../config.js';
import {
  convertFeetToInches,
  convertWeightToMetric,
  convertInchesToCM,
  validateInputs,
} from '../helpers.js';

class Person {
  state = { stats: {} };
  #activityFactor = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  validateForm(formData) {
    if (!validateInputs(formData)) {
      return {
        valid: false,
        error: 'Age, height and weight must be higher than 0!',
      };
    }
    return { valid: true };
  }

  calculateStats(formData, typeOfUnit) {
    if (typeOfUnit === 'imperial') {
      formData.weight = this.#convertWeight(formData.weight);
      formData.height = this.#convertHeight(
        formData.height,
        formData.heightInch
      );
      delete formData.heightInch;
    }

    this.state.stats.bmr = this.#getBMR(formData);
    this.state.stats.tdee = this.#getTDEE(
      this.state.stats.bmr,
      formData.activity
    );
    this.state.stats.goalTDEE = this.#getGoalTDEE(
      this.state.stats.tdee,
      formData.goal
    );
    this.state.stats.macros = this.#getMacros(this.state.stats.goalTDEE);
  }

  #getBMR(formData) {
    return Math.round(
      this.#calculateBMR(
        formData.sex,
        +formData.weight,
        +formData.height,
        +formData.age
      )
    );
  }

  #getTDEE(BMR, activity) {
    return Math.round(BMR * this.#activityFactor[activity]);
  }

  #getGoalTDEE(TDEE, goalPercentage) {
    return Math.round(TDEE + TDEE * (+goalPercentage / 100));
  }

  #getMacros(goalTDEE) {
    const carbs = Math.round(
      (goalTDEE * (CARBS_PERCENTAGE / 100)) / CARBS_CALORIE_PER_GRAM
    );
    const proteins = Math.round(
      (goalTDEE * (PROTEINS_PERCENTAGE / 100)) / PROTEINS_CALORIE_PER_GRAM
    );
    const fats = Math.round(
      (goalTDEE * (FATS_PERCENTAGE / 100)) / FATS_CALORIE_PER_GRAM
    );
    return { carbs, fats, proteins };
  }

  #calculateBMR(sex, weight, height, age) {
    if (sex === 'male')
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    0;
    if (sex === 'female')
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  #convertWeight(weightInLbs) {
    return convertWeightToMetric(weightInLbs);
  }

  #convertHeight(feet, inch) {
    const heightInInches = convertFeetToInches(feet) + +inch;
    return convertInchesToCM(heightInInches);
  }
}

export default new Person();
