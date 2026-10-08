// controllers/marketplaceController.js
const { generalSettings } = require('../services');
const catchAsync = require('../utils/catchAsync');

const userId = (user) => user?.id || user?._id;

const updateGeneralSetting = catchAsync(async (req, res) => {
  try {
    // Pass update data from req.body to the function
    const updateData = req.body;
    const { status, data, message } =
      await generalSettings.generalSettingsByUpdate(
        userId(req.user),
        updateData
      );

    return res.status(status).json({
      status: status === 200,
      message: message || 'General setting fetched/updated successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Unexpected error',
      error: err.message,
    });
  }
});

const getGeneralSetting = catchAsync(async (req, res) => {
  try {
    const { status, data, message } =
      await generalSettings.generalSettingsByGet(userId(req.user));

    return res.status(status).json({
      status: true,
      message: message || 'General setting fetched successfully.',
      data,
    });
  } catch (error) {
    console.error('Error in getGeneralSetting controller:', error);

    return res.status(500).json({
      status: false,
      message: 'Failed to fetch general settings.',
      error: error.message,
    });
  }
});

module.exports = { updateGeneralSetting, getGeneralSetting };
