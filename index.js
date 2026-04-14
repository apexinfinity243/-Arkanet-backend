const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("🚀 Arkanet backend actif");
});

app.listen(3000, () => {
    console.log("Serveur lancé");
});
