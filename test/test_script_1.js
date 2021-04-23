// All tests are written using mocha
// The individual units which are reponsible for calculating the BMI value as well as the unit reponsible for determining the category and health risk are tested here
const assert = require("assert");
const {
  calculateBMISubMethod,
  getBMICategoryAndHealthRisk,
} = require("../domain/services/calculate");

// Test 1
describe('Calculating BMI of patient : { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 }', () => {
  it('should return { gender: "Male", bmi: 32.83061454806607, bmi_category: "Moderately obese", health_risk: "Medium risk" }', () => {
    assert(
      calculateBMISubMethod({
        gender: "Male",
        heightInCM: 171,
        weightInKG: 96,
      }),
      {
        gender: "Male",
        bmi: 32.83061454806607,
        bmi_category: "Moderately obese",
        health_risk: "Medium risk",
      }
    );
  });
});

// Test 2
describe("Getting BMI category and health risk of patient with BMI : 32.83061454806607", () => {
  it('should return { category: "Moderately obese", health_risk: "Medium risk" }', () => {
    assert(getBMICategoryAndHealthRisk(32.83061454806607), {
      bmi_category: "Moderately obese",
      health_risk: "Medium risk",
    });
  });
});
