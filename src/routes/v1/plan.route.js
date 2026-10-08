const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { planValidation } = require('../../validations');
const { planController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(planValidation.createPlan), planController.createPlan)
  .get(validate(planValidation.getPlans), planController.getPlans);

router
  .route('/:planId')
  .get(validate(planValidation.getPlan), planController.getPlan)
  .put(auth(), validate(planValidation.updatePlan), planController.updatePlan);

router
  .route('/:planId/status')
  .put(
    auth(),
    validate(planValidation.updatePlanStatus),
    planController.updateStatus
  );

module.exports = router;
