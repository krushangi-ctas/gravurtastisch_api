const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { supportValidation } = require('../../validations');
const { supportController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(
    validate(supportValidation.createSupportRequest),
    supportController.createSupportRequest
  )
  .get(auth(), supportController.getAllSupportRequests);

router
  .route('/:requestId/status')
  .put(
    auth(),
    validate(supportValidation.updateSupportRequestStatus),
    supportController.updateSupportRequestStatus
  );

module.exports = router;
