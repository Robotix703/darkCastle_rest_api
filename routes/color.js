const express = require("express");

const checkAuth = require("../middleware/check-auth");

const ColorControllers = require("../controllers/color");

const router = express.Router();

router.get('/', ColorControllers.getColors);
router.get('/filtre', ColorControllers.getColorsFiltre);
router.get('/nom', ColorControllers.getColorByName);
router.get('/drawerName', ColorControllers.getColorsFromDrawer);

router.put('/:id', checkAuth, ColorControllers.updateColor);

router.post('/toBuy', checkAuth, ColorControllers.updateToBuy);
router.post('/', checkAuth, ColorControllers.writeColor);

router.delete("/:id", checkAuth, ColorControllers.deleteColor);

module.exports = router;
