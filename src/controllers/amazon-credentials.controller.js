const { amazonCredentialsService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const userId = (user) => user?.id || user?._id;

const getAmazonCredentialsByUserId = catchAsync(async (req, res) => {
  const { status, message, data } =
    await amazonCredentialsService.getAmazonCredentialsByUserId(
      userId(req.user)
    );
  res.status(status).send({ status, message, data });
});

const getAmazonCredentialsById = catchAsync(async (req, res) => {
  const { status, message, data } =
    await amazonCredentialsService.getAmazonCredentialsById(
      req.params.credentialsId
    );
  res.status(status).send({ status, message, data });
});

const upsertAmazonCredentials = catchAsync(async (req, res) => {
  const { status, message, data } =
    await amazonCredentialsService.upsertAmazonCredentials(
      req.body,
      userId(req.user)
    );
  res.status(status).send({ status, message, data });
});

module.exports = {
  getAmazonCredentialsById,
  upsertAmazonCredentials,
  getAmazonCredentialsByUserId,
};
