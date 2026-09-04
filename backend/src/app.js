const express = require("express");
const cors = require("cors");

const searchRoutes = require("./routes/searchRoutes");
const productRoutes =
    require("./routes/productRoutes");

const selectProductRoutes =
    require(
        "./routes/selectProductRoutes"
    );

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/select-product",
    selectProductRoutes
);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartCart AI Backend Running"
  });
});

module.exports = app;