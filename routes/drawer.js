const express = require("express");
const checkAuth = require("../middleware/check-auth");

const DrawerControllers = require("../controllers/drawer");

const router = express.Router();

router.get('/', DrawerControllers.getDrawers);
router.get('/nom', DrawerControllers.getDrawerByName);
router.get('/type', DrawerControllers.getDrawerByType);
router.get('/notFull', DrawerControllers.getDrawerNotFull);

router.put('/:id', checkAuth, DrawerControllers.updateDrawer);

router.post('/', checkAuth, DrawerControllers.writeDrawer);
router.post('/takeSlot', checkAuth, DrawerControllers.takeSlot);
router.post('/freeSlot', checkAuth, DrawerControllers.freeSlot);

router.delete("/:id", checkAuth, DrawerControllers.deleteDrawer);

module.exports = router;
