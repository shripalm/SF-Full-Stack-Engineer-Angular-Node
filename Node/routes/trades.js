const express = require('express');
const router = express.Router();
let controller = require('../controllers/trades')

router.post('/', controller.createTrades)
router.get('/', controller.getAllTrades)
router.get('/:id', controller.getTradesById)
router.patch('/:id', controller.notAllowedPutDeletePatch)
router.put('/:id', controller.notAllowedPutDeletePatch)
router.delete('/:id', controller.notAllowedPutDeletePatch)

module.exports = router;
