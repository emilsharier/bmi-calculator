const fs = require("fs");

const path = require("path");
const filePath = path.join(__dirname, "dummy_data.json");

const { errorLog } = require("../../common/messages");

var instream = fs.createReadStream(filePath, {
  encoding: "utf-8",
});

const calculateBMI = (callback) => {
  try {
    let result = {};
    let data = {};

    instream
      .on("data", (chunk) => {
        console.log("Getting data");
        data = JSON.parse(chunk);
        console.log("data : ", data);
      })
      .on("end", () => {
        let totalData = [];
        let overweightPeopleCount = 0;
        data.map((item, index) => {
          let individualReport = calculateBMISubMethod({
            gender: item.Gender,
            heightInCM: item.HeightCm,
            weightInKG: item.WeightKg,
          });
          if (
            individualReport.health_risk !== "Underweight" ||
            individualReport.health_risk !== "Normal weight"
          )
            overweightPeopleCount++;
          totalData.push(individualReport);
        });
        result = {
          individual_reports: totalData,
          overweight_patients_count: overweightPeopleCount,
        };
        callback(null, result);
      })
      .on("error", (err) => {
        callback(err, null);
      });
  } catch (ex) {
    errorLog(ex);
  }
};

const calculateBMISubMethod = ({ gender, weightInKG, heightInCM }) => {
  const bmi = weightInKG / Math.pow(heightInCM / 100, 2);
  const result = {
    gender: gender,
    bmi: bmi,
    ...getBMICategoryAndHealthRisk(bmi),
  };
  return result;
};

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

module.exports = { calculateBMI };
