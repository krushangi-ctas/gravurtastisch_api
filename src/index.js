const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const http = require('http');
// const cron = require('node-cron');
// const { runSolicitationProcess } = require('./solicitationServices');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  // Create HTTP server with Express app
  server = http.createServer(app);

  // Start HTTP server
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

// cron.schedule('*/10 * * * *', runSolicitationProcess);
// cron.schedule('*/5 * * * *', manageOrders);
// cron.schedule('*/15 * * * *', autoFeedbackRequest);

// setTimeout(() => {
//   runSolicitationProcess();
//   manageOrders();
//   autoFeedbackRequest();
// }, 3000);
