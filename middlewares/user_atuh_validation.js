const joi = require("joi");

// Validate signup user
const validateSignupUser = (req, res, next) => {
  const schema = joi
    .object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(4)
        .max(300)
        .required(),
      password: joi.string().min(6).required(),
      userBio: joi.string().required(),
    })
    .unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad Rquest", error });
  }
  next();
};

const validateSigninUser = (req, res, next) => {
  const schema = joi
    .object({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(4)
        .max(300)
        .required(),
      password: joi.string().min(6).required(),
    })
    .unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad Rquest", error });
  }
  next();
};

module.exports = { validateSignupUser, validateSigninUser };
