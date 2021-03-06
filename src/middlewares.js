const joi = require("joi")

module.exports.validateBodyUser = (req, res, next) => {
  const user = req.body
  const userSchema = joi.object({
    UserName: joi.string().required(),
    FullName: joi.string().required(),
    Email: joi.string().email().required(),
    Phone: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/),
    Adress: joi.string().required(),
    Password: joi.string().alphanum().required(),
    IdRole: joi.string().alphanum().required(),
  })
  const result = userSchema.validate(user)
  const { value, error } = result
  const valid = error == null
  if (!valid) {
    res.status(400).json({ succes: false, message: "Validation error", data: value, error: error })
  } else {
    next()
  }
}

module.exports.validateBodyProduct = (req, res, next) => {
  const product = req.body
  const userSchema = joi.object({
    Name: joi.string().required(),
    Price: joi.string().alphanum().required(),
    Photo: joi.string().max(2043).required(),
  })
  const result = userSchema.validate(product)
  const { value, error } = result
  const valid = error == null
  if (!valid) {
    res.status(400).json({ succes: false, message: "Validation error", data: value, error: error })
  } else {
    next()
  }
}

module.exports.validateBodyUpdateUser = (req, res, next) => {
  const user = req.body
  const userSchema = joi.object({
    Email: joi.string().email().required(),
    Phone: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    Adress: joi.string().required(),
    IdRole: joi.string().alphanum().required(),
  })
  const result = userSchema.validate(user)
  const { value, error } = result
  const valid = error == null
  if (!valid) {
    res.status(400).json({ succes: false, message: "Validation error", data: value, error: error })
  } else {
    next()
  }
}

module.exports.validateBodyUpdateProduct = (req, res, next) => {
  const user = req.body
  const userSchema = joi.object({
    Name: joi.string().required(),
    Price: joi.string().alphanum().required(),
  })
  const result = userSchema.validate(user)
  const { value, error } = result
  const valid = error == null
  if (!valid) {
    res.status(400).json({ succes: false, message: "Validation error", data: value, error: error })
  } else {
    next()
  }
}

module.exports.validateBodyStateOrder = (req, res, next) => {
  const user = req.body
  const userSchema = joi.object({
    State: joi.string().alphanum().required(),
  })
  const result = userSchema.validate(user)
  const { value, error } = result
  const valid = error == null
  if (!valid) {
    res.status(400).json({ succes: false, message: "Validation error", data: value, error: error })
  } else {
    next()
  }
}
