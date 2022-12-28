const express = require('express');
const bodyParser = require("body-parser");
const BDD = require('./BDD');
const path = require('path')

const figurinesRoutes = require('./routes/figurines');
const userRoutes = require("./routes/user");
const paintRoutes = require("./routes/paint");
const colorRoutes = require("./routes/color");
const drawerRoutes = require("./routes/drawer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Autorisation accès dossiers
app.use("/images", express.static(path.join("images")));    //Images

//gestion du comflit CORS
app.use((req, res, next) => {

    //Mise en place des headers
    res.setHeader('Access-Control-Allow-Origin', "*");

    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");

    //Libération de la requête
    next();
});

app.use("/api/figurines", figurinesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/paint", paintRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/drawer", drawerRoutes);

module.exports = app;
