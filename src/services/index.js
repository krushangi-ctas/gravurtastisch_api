//Auth  Module
module.exports.authService = require('./auth.service');
module.exports.emailService = require('./email.service');
module.exports.tokenService = require('./token.service');
module.exports.userService = require('./user.service');

module.exports.systemLogService = require('./system-log.service');

//common Module
module.exports.commonService = require('./common.service');

//Cron Module
module.exports.cronLogService = require('./cron-log.service');

module.exports.ordersService = require('./orders.service');

module.exports.marketplaceService = require('./marketplace.service');
module.exports.generalSettings = require('./generalSetting.service');
module.exports.amazonCredentialsService = require('./amazon-credentials.service');
module.exports.blogService = require('./blog.service');
module.exports.universalOtpService = require('./universal-otp.service');
module.exports.websiteConfigurationService = require('./website-configuration.service');
module.exports.planService = require('./plan.service');
