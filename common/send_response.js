const send = (res, status, data) => {
  //Get first digit of status
  const statusInitial = status.toString().charAt(0);
  let success = statusInitial === "4" || statusInitial === "5" ? false : true;
  res.status(status).json({ success, data: data });
};

module.exports = { send };
