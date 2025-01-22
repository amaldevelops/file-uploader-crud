import { body, validationResult } from "express-validator";

const emailError = "Must be an E-mail address as username";

const ValidateUserLogin = [
  body("user_name")
    .trim()
    .notEmpty()
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage(`Username: ${emailError}`),
  body("password").trim().escape(),
];

export { ValidateUserLogin };
