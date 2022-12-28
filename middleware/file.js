const multer = require("multer"); //Gestion stockage des images

//Liste des types pour les images
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

//Sauvegarde des images
const storage = multer.diskStorage({
  //Emplacement des fichiers
  destination: (req, file, cb) => {
    //Vérification
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Mauvais type");
    if (isValid) {
      error = null;
    }
    //Sauvegarde
    cb(error, "images");
  },
  //Nom des fichiers
  filename: (req, file, cb) => {
    //Nom
    let name = file.originalname.toLocaleLowerCase().split(' ').join('_');
    name = name.split('.')[0];

    //Extension
    const ext = MIME_TYPE_MAP[file.mimetype];
    //Sortie
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({ storage: storage }).single("image");
