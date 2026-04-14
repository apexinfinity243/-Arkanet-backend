const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// 🔍 Vérifier si la variable est bien chargée
console.log("MONGO_URL =", process.env.MONGO_URL);

// 🔌 CONNEXION MONGODB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("✅ MongoDB connecté");
})
.catch((err) => {
    console.log("❌ Erreur MongoDB :", err);
});

// 📦 MODÈLE UTILISATEUR
const User = mongoose.model("User", {
    nom: String,
    postnom: String,
    prenom: String,
    birthdate: String,
    lieu: String,
    phone: String,
    email: String,
    password: String
});

// 🌐 ROUTE TEST
app.get("/", (req, res) => {
    res.send("🚀 Arkanet backend + MongoDB OK");
});

// 🔐 ROUTE INSCRIPTION
app.post("/register", async (req, res) => {
    try {
        const {
            nom,
            postnom,
            prenom,
            birthdate,
            lieu,
            phone,
            email,
            password
        } = req.body;

        // Vérifier si email existe déjà
        const exist = await User.findOne({ email });

        if (exist) {
            return res.json({ message: "❌ Email déjà utilisé" });
        }

        const user = new User({
            nom,
            postnom,
            prenom,
            birthdate,
            lieu,
            phone,
            email,
            password
        });

        await user.save();

        res.json({ message: "✅ Inscription réussie" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// 🚀 LANCEMENT SERVEUR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
