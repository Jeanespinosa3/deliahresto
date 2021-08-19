const express = require("express")
const auth = require("../security/auth")
const actions = require("../database/actions")
const middlewares = require("../middlewares")

const router = express.Router() //Ruteo de endpoints

router.get("/users", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const id = req.userId
  if (isAdmi === 1) {
    const result = await actions.Select("SELECT * FROM users", {})
    res.json(result)
    console.log(isAdmi)
  }
  if (isAdmi === 2) {
    const result = await actions.Select(`SELECT * FROM users WHERE Id =:id`, { id: id })
    res.json(result)
    console.log(isAdmi)
  }
})

router.get("/user/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  if (isAdmi != 1) {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  } else {
    const result = await actions.Select("SELECT * FROM users WHERE Id = :id", {
      id: req.params.id,
    })
    console.log(result)
    if (!result.length) {
      res.status(404).json({ succes: false, message: "User not found" })
    } else {
      res.status(200).json({ succes: true, result })
    }
  }
})

router.post("/user", auth.auth, middlewares.validateBodyUser, auth.validateAdmi, async (req, res) => {
  //Creacion de una cuenta nueva
  const user = req.body
  let result
  const isAdmi = req.admi
  if (isAdmi === 1) {
    try {
      user.UserName = user.UserName.toLowerCase()
      result = await actions.Insert(
        `INSERT INTO users (UserName, FullName, Email, Phone, Adress, Password, IdRole) 
            VALUES (:UserName, :FullName, :Email, :Phone, :Adress, :Password, :IdRole)`,
        user
      )
    } catch (error) {
      res.status(500).json(error)
    }
    res.status(200).json(result)
  }
  if (isAdmi !== 1) {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.patch("/user/:id", middlewares.validateBodyUpdateUser, auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const params = req.body
  const resultQuery = await actions.Select("SELECT * FROM users WHERE Id = :id", { id: req.params.id })
  let result
  if (isAdmi === 1) {
    try {
      result = await actions.Update(`UPDATE users SET Email =:Email, Phone =:Phone, Adress =:Adress, IdRole =:IdRole WHERE Id =${req.params.id}`, params)
    } catch (error) {
      res.status(500).json(error)
    }
    if (!resultQuery.length) {
      res.status(404).json({ succes: false, message: "user not found" })
    } else {
      res.status(200).json({ succes: true, message: "User has been updated" })
    }
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.delete("/user/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const resultQuery = await actions.Select(`SELECT * FROM users WHERE Id =:id`, { id: req.params.id })
  if (isAdmi === 1) {
    const result = await actions.Delete(`DELETE FROM users WHERE Id =:id`, { id: req.params.id })
    if (!resultQuery.length) {
      res.status(404).json({ succes: false, message: "User not found" })
    } else {
      res.status(200).json({ succes: true, message: "User has been deleted" })
    }
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

module.exports = router
