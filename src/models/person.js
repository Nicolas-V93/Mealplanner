import {
  CARBS_PERCENTAGE,
  PROTEINS_PERCENTAGE,
  FATS_PERCENTAGE,
} from '../config.js';

class PersonData {
  #activityFactor = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  getBMR(formData) {
    return Math.round(
      this.#calculateBMR(
        formData.sex,
        +formData.weight,
        +formData.height,
        +formData.age
      )
    );
  }

  getTDEE(BMR, activity) {
    return Math.round(BMR * this.#activityFactor[activity]);
  }

  getGoalTDEE(TDEE, goalPercentage) {
    return Math.round(TDEE + TDEE * (+goalPercentage / 100));
  }

  getMacros(goalTDEE) {
    const carbs = goalTDEE * (CARBS_PERCENTAGE / 100);
    const proteins = goalTDEE * (PROTEINS_PERCENTAGE / 100);
    const fats = goalTDEE * (FATS_PERCENTAGE * 100);
    return { carbs, fats, proteins };
  }

  #calculateBMR(sex, weight, height, age) {
    if (sex === 'male')
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    0;
    if (sex === 'female')
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
}

export default new PersonData();

// Harris-Benedict Formula

// <!-- Men:
// BMR = 66.5 + (13.75 × weight [kg]) + (5.003 × height [cm]) – (6.775 × age [years])

// Women:
// BMR = 655.1 + (9.563 × weight [kg]) + (1.850 × height [cm]) – (4.676 × age [years]) -->
