const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');
const multipart = require('connect-multiparty');

const router = express.Router();

router.post(
  '/register-seller',
  validate(userValidation.registerSeller),
  userController.registerSeller
);
// upload image
const multipartMiddleware = multipart({
  uploadDir: `${__dirname}/../../uploads`,
});

router.route('/sign-in-with-token').get(auth(), (req, res) => {
  return res.status(200).send(req.user);
});
router
  .route('/')
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(auth(), userController.getUser);

router
  .route('/upload-image')
  .post(auth(), multipartMiddleware, userController.uploadProfile);

router.get('/get-all/user', auth(), userController.getAllUsers);
router.put('/admin-update/:userId', auth(), userController.adminUpdateUser);
router.get('/get-chats/:userId', auth(), userController.getUserForChat);

router.put(
  '/update-profile',
  auth(),
  // validate(userValidation.updateUser),
  userController.updateUser
);
router.put(
  '/update-password',
  auth(),
  // validate(userValidation.updateUser),
  userController.updateUserPassword
);

router.post(
  '/:userId/:loginId',
  auth(),
  validate(userValidation.deleteUser),
  userController.deleteUser
);

router
  .route('/profile/delete-image')
  .post(auth(), userController.deleteProfile);

module.exports = router;
