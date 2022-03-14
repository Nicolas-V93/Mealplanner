class PersonData {
  #activityFactor = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  calculateTDEE(formData) {
    return Math.ceil(
      this.#calculateBMR(
        formData.sex,
        +formData.weight,
        +formData.height,
        +formData.age
      )
    );
  }

  #calculateBMR(sex, weight, height, age) {
    console.log(sex, typeof weight, typeof height, age);
    if (sex === 'male')
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    if (sex === 'female')
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
}

export default PersonData;

// <!-- Men:
// BMR = 66.5 + (13.75 × weight [kg]) + (5.003 × height [cm]) – (6.775 × age [years])

// Women:
// BMR = 655.1 + (9.563 × weight [kg]) + (1.850 × height [cm]) – (4.676 × age [years]) -->
