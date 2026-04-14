const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// 🔍 Vérifier si la variable est bien chargée
console.log("MONGO_URL =", process.env.MONGO_URL);

// 🔌 CONNEXION MONGODB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connecté");
})
.catch((err) => {
    console.log("❌ Erreur MongoDB :", err);
});

// 🌐 ROUTE TEST
app.get("/", (req, res) => {
    res.send("🚀 Arkanet backend + MongoDB OK");
});

// 🚀 LANCEMENT SERVEUR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
