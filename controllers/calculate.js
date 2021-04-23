const { asyncHandler } = require("../middlewares/async_handler");

const { calculateBMI } = require("../domain/services/calculate");
const { send } = require("../common/send_response");

const calculate = asyncHandler(async (req, res, next) => {
  calculateBMI(function (err, body) {
    if (err) send(res, 500, err);
    else send(res, 201, body);
  });
});

module.exports = { calculate };
