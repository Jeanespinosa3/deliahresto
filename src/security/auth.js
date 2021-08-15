const { boolean } = require("joi")
const jwt = require("jsonwebtoken")
const actions = require("../database/actions")
const firma = "Firma_para_proyecto"

module.exports.generateToken = (data) => {
  return jwt.sign(data, firma)
}

module.exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const tokenVerificado = jwt.verify(token, firma)
    if (tokenVerificado) {
      req.user = tokenVerificado
      return next()
    }
  } catch (error) {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
}

module.exports.validateAdmi = async (req, res, next) => {
  const userName = req.user.userName
  const result = await actions.Select("SELECT * FROM users WHERE UserName =:userName", { userName: userName }) //obtenemos todo el objeto de la base de datos
  const admi = result[0].IdRole
  req.admi = admi
  req.userId = result[0].Id
  return next()
}
