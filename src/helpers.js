import { LBS_FACTOR, FEET_TO_INCH_MULTIPLIER, INCH_FACTOR } from './config';

export const convertWeightToMetric = function (weightInLbs) {
  return +(weightInLbs / LBS_FACTOR).toFixed(2);
};

export const convertFeetToInches = function (heightInFeet) {
  return +(heightInFeet * FEET_TO_INCH_MULTIPLIER);
};

export const convertInchesToCM = function (heightInInches) {
  return Math.round(heightInInches * INCH_FACTOR);
};

export const validateForm = function (fields) {
  const { age, height, weight } = fields;
  return [age, height, weight].every(isValid);
};

const isValid = function (value) {
  return value !== '';
};
