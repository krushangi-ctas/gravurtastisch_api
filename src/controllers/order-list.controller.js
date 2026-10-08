const catchAsync = require('../utils/catchAsync');
const { ordersService } = require('../services');
const pick = require('../utils/pick');

const userId = (user) => user?.id || user?._id;

const getOrderList = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['search', 'from', 'to', 'marketplaceId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'sortOrder']);
  const { status, message, data, pagination } =
    await ordersService.getOrderList(filter, options, userId(req.user));
  res.status(status).send({ status, message, data, pagination });
});

const updateFeedback = catchAsync(async (req, res) => {
  const { status, message, data } = await ordersService.updateFeedback(
    req.body,
    userId(req.user)
  );
  res.status(status).send({ status, message, data });
});

module.exports = {
  getOrderList,
  updateFeedback,
};
