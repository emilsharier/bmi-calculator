const chalk = require("chalk");

exports.messageLog = (message) => {
  console.log(chalk.bgBlue(message));
};

exports.errorLog = (error) => {
  console.log(chalk.bgRed(error));
};

exports.warningLog = (warning) => {
  console.log(chalk.bgYellow(warning));
};

exports.dbSuccessLog = (msg) => console.log(chalk.bgGreen(msg));
exports.dbErrorLog = (msg) => console.log(chalk.bgRed(msg));
