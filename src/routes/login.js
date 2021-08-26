const express = require("express")
const auth = require("../security/auth")
const actions = require("../database/actions")

const router = express.Router()

router.post("/login", async (req, res) => {
  const params = req.body
  const user = {
    userName: params.UserName,
    password: params.Password,
  }
  const result = await actions.Select(`SELECT COUNT(*) as count FROM users WHERE UserName =:userName AND Password =:password`, user)

  if (result && Array.isArray(result) && result.length > 0) {
    //isarray valida que lo que devuelve es un array
    if (result[0].count == 1) {
      res.json(auth.generateToken({ userName: user.userName }))
    } else {
      res.status(404).json({ succes: false, message: "User not found or password not valid" })
    }
  } else {
    res.status(404).json({ succes: false, message: "User not found or password not valid" })
  }
})

module.exports = router
