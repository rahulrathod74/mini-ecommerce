const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const sellerRoutes = require("./routes/sellerRoute");
const buyerRoutes = require("./routes/buyerRoute");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
