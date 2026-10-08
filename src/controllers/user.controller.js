const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService, emailService } = require('../services');
const config = require('../config/config');
const { deleteFile } = require('../utils/file-uploader');
const { User, UserArchive } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const { status, message, data } = await userService.createUser(req.body);
  res.status(status).send({ status, message, data });
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['search', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const { status, message, data, pagination } = await userService.queryUsers(
    filter,
    options
  );
  res.status(status).send({ status, message, data, pagination });
});

const getUser = catchAsync(async (req, res) => {
  const { status, message, data } = await userService.getUserDetailById(
    req.user._id
  );
  return res.status(status).send({ status, message, data });
});

const updateUser = catchAsync(async (req, res) => {
  const { status, message, data } = await userService.updateUserById({
    _id: req.user._id,
    ...req.body,
  });
  return res.status(status).send({ status, message, data });
});

const updateUserPassword = catchAsync(async (req, res) => {
  const { status, message, data } = await userService.updatePasswordById(
    req.user._id,
    req.body
  );
  return res.status(status).send({ status, message, data });
});

const deleteUser = catchAsync(async (req, res) => {
  // const { status, message, data } = await userService.deleteUserById(
  //   req.params.userId,
  //   req.params.loginId,
  //   req.body
  // );
  return res.status(200).send({ status: 200, message: '', data: {} });
});

const uploadProfile = catchAsync(async (req, res) => {
  const { status, message, data, picture } =
    await userService.uploadProfileImage(req.user._id, req.files.file);
  res.status(status).send({ status, message, data, picture });
});

const deleteProfile = catchAsync(async (req, res) => {
  await deleteFile(req.body.fileName, '');
  return res.status(200).json({
    status: httpStatus.OK,
    message: 'Profile Picture has been deleted.',
  });
});

const getAllUsers = async (req, res) => {
  try {
    const filter = pick(req.query, ['search', 'status']);
    filter.isSuperAdmin = { $ne: true };
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    if (!options.limit) options.limit = 20;
    if (!options.page) options.page = 1;
    if (!options.sortBy) options.sortBy = 'createdAt:desc';

    const result = await User.paginate(filter, options, [
      'name',
      'email',
      'businessName',
      'contact_no',
    ]);
    res.status(httpStatus.OK).json({
      data: result.results,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'Bad request', error });
  }
};

const getUserForChat = catchAsync(async (req, res) => {
  const { message, status, data } = await userService.getChatUserList(
    req.params.userId
  );
  res.status(status).send({ status, message, data });
});

const adminUpdateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { status, planLimits, businessName, contact_no } = req.body;

  // Soft-delete: archive the user and remove from active collection
  if (status === 2) {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    await UserArchive.create({
      originalId: user._id,
      name: user.name,
      email: user.email,
      businessName: user.businessName,
      contact_no: user.contact_no,
      role_id: user.role_id,
      address: user.address,
      avatar: user.avatar,
      marketplaces: user.marketplaces,
      isSuperAdmin: user.isSuperAdmin,
      planLimits: user.planLimits,
      status: user.status,
    });

    await User.findByIdAndDelete(userId);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'User deleted successfully',
      data: {},
    });
  }

  const updateData = {};
  if (status !== undefined) updateData.status = status;
  if (businessName !== undefined) updateData.businessName = businessName;
  if (contact_no !== undefined) updateData.contact_no = contact_no;
  if (planLimits !== undefined) {
    updateData.planLimits = {
      maxMarketplaces: Number(planLimits.maxMarketplaces),
      maxReviewRequestsPerMonth: Number(planLimits.maxReviewRequestsPerMonth),
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: 'User not found',
    });
  }

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const registerSeller = catchAsync(async (req, res) => {
  const { email, seller, business, phone, marketplaces } = req.body;
  const userBody = {
    email,
    name: seller,
    businessName: business,
    contact_no: phone,
    marketplaces,
    status: 0, // Inactive, needs admin approval
  };
  const result = await userService.createUser(userBody);

  if (result.status === httpStatus.OK || result.status === httpStatus.CREATED) {
    try {
      const content = `
        <h2 style="color: #0B1E39; margin: 0 0 16px;">New Seller Registration</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; color:#555; font-size:14px; font-weight:600;">Business Name</td></tr>
          <tr><td style="padding:0 0 12px; color:#0B1E39; font-size:15px;">${business}</td></tr>
          <tr><td style="padding:8px 0; color:#555; font-size:14px; font-weight:600;">Seller Name</td></tr>
          <tr><td style="padding:0 0 12px; color:#0B1E39; font-size:15px;">${seller}</td></tr>
          <tr><td style="padding:8px 0; color:#555; font-size:14px; font-weight:600;">Email</td></tr>
          <tr><td style="padding:0 0 12px; color:#0B1E39; font-size:15px;"><a href="mailto:${email}" style="color:#2F6FED; text-decoration:none;">${email}</a></td></tr>
          <tr><td style="padding:8px 0; color:#555; font-size:14px; font-weight:600;">Phone</td></tr>
          <tr><td style="padding:0 0 12px; color:#0B1E39; font-size:15px;">${
            phone || '—'
          }</td></tr>
        </table>
        <hr style="border:none; border-top:1px solid #e0e0e0; margin:20px 0;" />
        <p style="color:#888; font-size:13px;">This seller registered via the website and needs manual approval.</p>
      `;
      const htmlBody = await emailService.getMailBody(
        content,
        'New seller registration received'
      );
      await emailService.sendEmail(
        config.email.adminEmail,
        `New Seller Registration — ${seller}`,
        '',
        htmlBody
      );
    } catch (err) {
      console.error(
        'Failed to send seller registration notification email:',
        err
      );
    }
  }

  res.status(result.status).send(result);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfile,
  deleteProfile,
  getAllUsers,
  getUserForChat,
  updateUserPassword,
  adminUpdateUser,
  registerSeller,
};
