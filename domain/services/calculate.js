const fs = require("fs");

const path = require("path");
const filePath = path.join(__dirname, "dummy_data.json");

const { errorLog } = require("../../common/messages");

// Reading the data input file as a stream. (For maximum efficiency)
var instream = fs.createReadStream(filePath, {
  encoding: "utf-8",
});

const calculateBMI = (callback) => {
  try {
    let result = {};
    let data = {};

    // Listening to the stream. Once the stream receives the data, it is stored in a variable called 'data' and once the stream ends, it's parsed into it's JSON format (because stream reads data as String by default)
    instream
      .on("data", (chunk) => {
        data = JSON.parse(chunk);
      })
      .on("end", () => {
        // The BMI value, category and health risk for each inidividual patient is stored as a JSON object in this array
        let totalData = [];
        // The number of patients who are considered overweight
        let overweightPeopleCount = 0;
        // Since the input file is an array, we are mapping over the array elements
        data.map((item, index) => {
          // A sub-method called 'calculateBMISubMethod' is called which returns the individual report
          let individualReport = calculateBMISubMethod({
            gender: item.Gender,
            heightInCM: item.HeightCm,
            weightInKG: item.WeightKg,
          });
          // This part here determines if the patient is overweight or not, if yes, it increases the count by 1
          if (
            individualReport.health_risk !== "Underweight" ||
            individualReport.health_risk !== "Normal weight"
          )
            overweightPeopleCount++;
          totalData.push(individualReport);
        });
        // The final object which is sent back as the response to the request
        result = {
          individual_reports: totalData,
          overweight_patients_count: overweightPeopleCount,
        };
        // The callback passed from the controller is being called once the stream ends
        callback(null, result);
      })
      .on("error", (err) => {
        // The callback is passed with an error object if the stream emits an error
        callback(err, null);
      });
  } catch (ex) {
    errorLog(ex);
  }
};

// Sub-method to calculate the individual report of a patient
const calculateBMISubMethod = ({ gender, weightInKG, heightInCM }) => {
  const bmi = weightInKG / Math.pow(heightInCM / 100, 2);
  const result = {
    gender: gender,
    bmi: bmi,
    // Using spread operator to assign copy of the resultant object
    ...getBMICategoryAndHealthRisk(bmi),
  };
  return result;
};

// Sub-method to determine the category and the risk
const getBMICategoryAndHealthRisk = (bmi) => {
  let category = "",
    risk = "";
  if (bmi <= 18.4) {
    category = "Underweight";
    risk = "Malnutrition risk";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal weight";
    risk = "Low risk";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    risk = "Enhanced risk";
  } else if (bmi >= 30 && bmi <= 34.9) {
    category = "Moderately obese";
    risk = "Medium risk";
  } else if (bmi >= 35 && bmi <= 39.9) {
    category = "Severely obese";
    risk = "High risk";
  } else if (bmi === null || bmi === undefined) {
  } else {
    category = "Very severely obese";
    risk = "Very high risk";
  }

  return {
    bmi_category: category,
    health_risk: risk,
  };
};

module.exports = {
  calculateBMI,
  calculateBMISubMethod,
  getBMICategoryAndHealthRisk,
};
