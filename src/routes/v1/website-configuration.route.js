const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { websiteConfigurationValidation } = require('../../validations');
const { websiteConfigurationController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(websiteConfigurationController.getWebsiteConfiguration)
  .put(
    auth(),
    validate(websiteConfigurationValidation.updateWebsiteConfiguration),
    websiteConfigurationController.updateWebsiteConfiguration
  );

module.exports = router;
