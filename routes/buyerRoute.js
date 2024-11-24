const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const Cart = require("../models/CartModels");

const router = express.Router();

router.post("/cart/add", authenticate, authorize(["buyer"]), async (req, res) => {
  // Add product to cart logic
});

module.exports = router;
