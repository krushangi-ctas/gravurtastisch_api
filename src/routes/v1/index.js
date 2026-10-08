const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const config = require('../../config/config');
const ipRoute = require('./ip.route');
const cronLogRoute = require('./cron-log.route');
const emailTemplateRoute = require('./email-template.route');
const systemLog = require('./system-log.route');
const docsRoute = require('./docs.route');
const orderListRoute = require('./order-list.route');
const searchRoute = require('./search.route');
const marketplaceRoutes = require('./marketplace.routes');
const generalSettingRoutes = require('./general-setting.routes');
const amazonCredentialRoutes = require('./amazon-credentials.route');
const supportRoute = require('./support.route');
const blogRoute = require('./blog.route');
const universalOtpRoute = require('./universal-otp.route');
const websiteConfigurationRoute = require('./website-configuration.route');
const planRoute = require('./plan.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/ip',
    route: ipRoute,
  },
  {
    path: '/cron-log',
    route: cronLogRoute,
  },
  {
    path: '/email-template',
    route: emailTemplateRoute,
  },
  {
    path: '/system-log',
    route: systemLog,
  },
  {
    path: '/order',
    route: orderListRoute,
  },
  {
    path: '/search',
    route: searchRoute,
  },
  {
    path: '/marketplace',
    route: marketplaceRoutes,
  },
  {
    path: '/general-setting',
    route: generalSettingRoutes,
  },
  {
    path: '/amazon-credentials',
    route: amazonCredentialRoutes,
  },
  {
    path: '/support',
    route: supportRoute,
  },
  {
    path: '/blogs',
    route: blogRoute,
  },
  {
    path: '/universal-otp',
    route: universalOtpRoute,
  },
  {
    path: '/website-configuration',
    route: websiteConfigurationRoute,
  },
  {
    path: '/plans',
    route: planRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
