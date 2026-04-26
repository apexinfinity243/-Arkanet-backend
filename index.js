const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// 🔍 DEBUG
console.log("MONGO_URL =", process.env.MONGO_URL);

// 🔌 CONNEXION MONGODB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB connecté"))
.catch(err => console.log("❌ Erreur MongoDB :", err));

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
        console.log("📩 DONNÉES REÇUES :", req.body);

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

        // ❗ Vérification champs
        if (!nom || !postnom || !prenom || !birthdate || !lieu || !phone || !email || !password) {
            return res.json({ message: "❌ Tous les champs sont obligatoires" });
        }

        // 🔍 Vérifier email existant
        const exist = await User.findOne({ email });

        if (exist) {
            return res.json({ message: "❌ Email déjà utilisé" });
        }

        // 💾 ENREGISTREMENT
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

        console.log("✅ UTILISATEUR ENREGISTRÉ");

        res.json({ message: "✅ Inscription réussie" });

    } catch (err) {
        console.log("❌ ERREUR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// 🚀 LANCEMENT SERVEUR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur lancé sur le port " + PORT);
});
