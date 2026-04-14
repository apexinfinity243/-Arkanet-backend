const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// 🔌 CONNECT MONGODB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB connecté"))
.catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("🚀 -Arkanet-backend + MongoDB OK");
});

app.listen(3000, () => {
    console.log("Serveur lancé");
});
