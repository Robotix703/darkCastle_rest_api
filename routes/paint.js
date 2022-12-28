const express = require("express");

const checkAuth = require("../middleware/check-auth");

const PaintControllers = require("../controllers/paint");

const router = express.Router();

router.get('/', PaintControllers.getInstructions);
router.get('/:id', PaintControllers.getInstruction);

router.post('/', checkAuth, PaintControllers.writeInstruction);

router.put("/:id", checkAuth, PaintControllers.updateInstruction);

router.delete("/:id", checkAuth, PaintControllers.deleteInstruction);

module.exports = router;
