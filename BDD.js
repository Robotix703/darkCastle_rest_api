const mongoose = require('mongoose');
require('dotenv').config()

//Configuration en fonction de l'environnement de build
let user, pwd, host, name;
if (process.env.NODE_ENV === "production") {
    name = process.env.DB_PROD_NAME;
    host = process.env.DB_HOST;
    user = process.env.DB_PROD_USER;
    pwd = process.env.DB_PROD_PASS;
}else{
    name = process.env.DB_DEV_NAME;
    host = process.env.DB_IP;
    user = process.env.DB_DEV_USER;
    pwd = process.env.DB_DEV_PASS;
}

//Connexion à la BD
mongoose.connect(
    "mongodb://" + user + ":" + pwd + "@" + host + "/" + name
    , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("BDD - Connectée");
}).catch(() => {
    console.log("BDD - Erreur de connexion");
});
