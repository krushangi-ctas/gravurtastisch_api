const Joi = require('joi');
const { objectId } = require('./custom.validation'); // Assuming you have a custom validator for ObjectId

const createRole = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    role_name: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    group_email_id: Joi.string().trim().optional(),
    section_list: Joi.array().optional(),
    store_ids: Joi.array()
      .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
      .allow(null)
      .optional(),
    warehouse_ids: Joi.array()
      .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
      .allow(null)
      .optional(),
    marketplace_ids: Joi.array()
      .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
      .allow(null)
      .optional(),
    child_warehouse_ids: Joi.array()
      .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
      .allow(null)
      .optional(),
    company_ids: Joi.array()
      .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
      .allow(null)
      .optional(),
  }),
};

// Validation schema for updating a Role by ID
const updateRoleById = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId).required(), // Ensure it's a valid MongoDB ObjectId
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      role_name: Joi.string().trim().optional(),
      description: Joi.string().trim().optional(),
      group_email_id: Joi.string().trim().optional(),
      section_list: Joi.array().optional(),
      store_ids: Joi.array()
        .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
        .allow(null)
        .optional(),
      warehouse_ids: Joi.array()
        .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
        .allow(null)
        .optional(),
      marketplace_ids: Joi.array()
        .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
        .allow(null)
        .optional(),
      child_warehouse_ids: Joi.array()
        .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
        .allow(null)
        .optional(),
      company_ids: Joi.array()
        .items(Joi.string().custom(objectId)) // Ensure these are valid ObjectIds
        .allow(null)
        .optional(),
      status: Joi.number().valid(0, 1, 2).optional(), // 0 - Inactive, 1 - Active, 2 - Deleted
    })
    .min(1), // Ensure at least one field is provided
};

// Validation schema for fetching a list of roles
const getRoleList = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('createdAt', 'role_name').default('createdAt'), // Add sortBy here
  search: Joi.string().allow(''), // Allow empty search
});

// Validation schema for fetching a Role by ID
const getRoleById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRole,
  updateRoleById,
  getRoleList,
  getRoleById,
};
