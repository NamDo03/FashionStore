const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
var cors = require("cors");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connect DB success!!"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/stripe", stripeRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!!!");
})