const express = require("express");
const api1 = require("../controller/waController");
const router = express.Router();

router.get("/send", api1);
router.post("/send", api1);

module.exports = router;