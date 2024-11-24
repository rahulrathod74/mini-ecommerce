const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const User = require("../models/UserModels");
const Product = require("../models/ProductModels");

const router = express.Router();

// Admin manages all users
router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Admin manages all products
router.get("/products", authenticate, authorize(["admin"]), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
