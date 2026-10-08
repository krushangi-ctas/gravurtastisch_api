module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.ipController = require('./ip.controller');
module.exports.marketplaceController = require('./marketplace.controller');
//Master Module
module.exports.emailTemplateController = require('./email-template.controller');
module.exports.systemLogController = require('./system-log.controller');
module.exports.fileListController = require('./file-uploader/file-list.controller');
module.exports.uploadFileController = require('./file-uploader/upload-file.controller');

module.exports.ordersController = require('./order-list.controller');
module.exports.searchController = require('./search.controller');
//Cron Module
module.exports.cronLogController = require('./cron-log.controller');
module.exports.generalSettingController = require('./generalSetting.controller');
module.exports.amazonCredentialsController = require('./amazon-credentials.controller');
module.exports.supportController = require('./support.controller');
module.exports.blogController = require('./blog.controller');
module.exports.universalOtpController = require('./universal-otp.controller');
module.exports.websiteConfigurationController = require('./website-configuration.controller');
module.exports.planController = require('./plan.controller');
