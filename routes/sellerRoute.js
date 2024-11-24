const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const Product = require("../models/ProductModels");

const router = express.Router();

router.post("/products", authenticate, authorize(["seller"]), async (req, res) => {
  try {
    const product = new Product({ ...req.body, sellerId: req.user._id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
