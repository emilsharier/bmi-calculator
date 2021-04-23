# BMI calculator

This is a sample application to calculate the BMI and determine the BMI category and health risk of the patients.

## Input data

The data which the application takes in is a json file in the directory `/domain/services`. For the time being, I have put dummy data inside the directory.
The reason for considering the data input as a file rather than a JSON object that can be passed into the request body is because the problem statement states that the input range may go upto 1 Lakh.

## Sample input data

`dummy_data.json`

    [
        { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 },
        { "Gender": "Male", "HeightCm": 161, "WeightKg": 85 },
        { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 },
        { "Gender": "Female", "HeightCm": 166, "WeightKg": 62 },
        { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 },
        { "Gender": "Female", "HeightCm": 167, "WeightKg": 50 }
    ]

## Endpoints

    /calculate

This endpoint looks for the filename `dummy_data.json` inside the directory `domain/services` and performs the necessary operations.

## Sample response data

    {
        "success": true,
        "data": {
            "individual_reports": [
                {
                    "gender": "Male",
                    "bmi": 32.83061454806607,
                    "bmi_category": "Moderately obese",
                    "health_risk": "Medium risk"
                },
                {
                    "gender": "Male",
                    "bmi": 32.79194475521777,
                    "bmi_category": "Moderately obese",
                    "health_risk": "Medium risk"
                },
                {
                    "gender": "Male",
                    "bmi": 23.76543209876543,
                    "bmi_category": "Normal weight",
                    "health_risk": "Low risk"
                },
                {
                    "gender": "Female",
                    "bmi": 22.49963710262738,
                    "bmi_category": "Normal weight",
                    "health_risk": "Low risk"
                },
                {
                    "gender": "Female",
                    "bmi": 31.11111111111111,
                    "bmi_category": "Moderately obese",
                    "health_risk": "Medium risk"
                },
                {
                    "gender": "Female",
                    "bmi": 17.92821542543655,
                    "bmi_category": "Underweight",
                    "health_risk": "Malnutrition risk"
                }
            ],
            "overweight_patients_count": 6
        }
    }

## Env variables

    PORT=<custom PORT>
    API_VERSION=<custom versioning>
    NODE_ENV=<production or development>

## Tests

There are two unit tests which are written using `Mocha`. Mocha is a testing framework for NodeJS which allows developers to easily test their code.
