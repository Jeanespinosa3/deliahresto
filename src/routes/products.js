const express = require("express")
const auth = require("../security/auth")
const actions = require("../database/actions")
const middlewares = require("../middlewares")

const router = express.Router()

router.get("/products", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi

  if (isAdmi === 1) {
    const result = await actions.Select("SELECT * FROM products", {})
    res.json(result)
    console.log(isAdmi)
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.get("/product/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  if (isAdmi != 1) {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  } else {
    const result = await actions.Select("SELECT * FROM products WHERE Id = :id", {
      id: req.params.id,
    })
    if (!result.length) {
      res.status(404).json({ succes: false, message: "Product not found" })
    } else {
      res.status(200).json({ succes: true, result })
    }
  }
})

router.post("/product", auth.auth, auth.validateAdmi, middlewares.validateBodyProduct, async (req, res) => {
  const product = req.body
  let result
  const isAdmi = req.admi
  if (isAdmi === 1) {
    try {
      result = await actions.Insert(`INSERT INTO products (Name, Price, Photo)  VALUES (:Name, :Price, :Photo)`, product)
    } catch (error) {
      res.status(500).json(error)
    }
    res.status(200).json(result)
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.patch("/products/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  //Code here
})

router.delete("/products/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  if (isAdmi === 1) {
    const result = await actions.Delete("DELETE FROM products WHERE Id =:id", {
      id: req.params.id,
    })
    res.status(200).json({ succes: true, message: "Product has been deleted" })
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

module.exports = router
