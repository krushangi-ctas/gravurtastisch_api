const express = require('express');
const fs = require('fs');
const path = require('path');
const multipart = require('connect-multiparty');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { blogValidation } = require('../../validations');
const { blogController } = require('../../controllers');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads/blogs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multipartMiddleware = multipart({
  uploadDir,
});

router
  .route('/')
  .post(auth(), validate(blogValidation.createBlog), blogController.createBlog)
  .get(validate(blogValidation.getBlogs), blogController.getBlogs);

router
  .route('/upload-image')
  .post(auth(), multipartMiddleware, blogController.uploadImage);

router
  .route('/:blogId')
  .get(validate(blogValidation.getBlog), blogController.getBlog)
  .put(auth(), validate(blogValidation.updateBlog), blogController.updateBlog);

router
  .route('/:blogId/status')
  .put(
    auth(),
    validate(blogValidation.updateBlogStatus),
    blogController.updateStatus
  );

module.exports = router;
