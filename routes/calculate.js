const { calculate } = require("../controllers/calculate");

const router = require("express").Router();

router.get("/", calculate);

module.exports = router;
