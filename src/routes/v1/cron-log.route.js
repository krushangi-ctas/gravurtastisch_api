const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { cronLogController } = require('../../controllers');

router.get('/get-list', auth(), cronLogController.getAllCrons);

module.exports = router;
