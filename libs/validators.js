const { body, header, query, param } = require("express-validator");

VALIDATORS = {
  TODO: {
    Create: [
      body("name")
        .exists()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be string"),
    ],
    GetTodo: [
      query("id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("id must be a mongo id"),
    ],
    UpdateTodo: [
      param("id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("id must be a mongo id"),
      body("name")
        .exists()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be string"),
      body("done")
        .exists()
        .withMessage("Done must be string"),
    ],
    DeleteTodo: [
      param("id")
        .exists()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("id must be a mongo id")
    ],
  },
};

module.exports = VALIDATORS;
