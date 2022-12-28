const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const FigurinesController = require("../controllers/figurines");

const router = express.Router();

router.get('/categoryList', FigurinesController.getCategoryList);
router.get('/category', FigurinesController.getCategoryFigurines);
router.get('/favoris', FigurinesController.getFavorisForUser);
router.get('/filtre', FigurinesController.getFiltreredFigurines);
router.get('/:id', FigurinesController.getFigurine);
router.get('/', FigurinesController.getFigurines);

router.put("/:id", checkAuth, extractFile, FigurinesController.updateFigurine);

router.post('/updatePainted', checkAuth, FigurinesController.updatePainted);
router.post('/favoris', checkAuth, FigurinesController.updateFavoris);
router.post('', checkAuth, extractFile, FigurinesController.writeFigurine);


router.delete("/:id", checkAuth, FigurinesController.deleteFigurine);

module.exports = router;
