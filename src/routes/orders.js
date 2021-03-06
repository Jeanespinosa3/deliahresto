const express = require("express")
const actions = require("../database/actions")
const auth = require("../security/auth")
const middlewares = require("../middlewares")

const router = express.Router()

router.get("/order", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const id = req.userId
  if (isAdmi === 1) {
    const result = await actions.Select(
      `
      SELECT orders.Id, orders.DateTime, orders.Description, orders.Total, payment.PaymentMethod, users.Fullname, users.Adress, states.State
      FROM orders
      INNER JOIN users ON (orders.IdUser = users.Id)
      INNER JOIN payment ON (orders.Payment = payment.Id)
      INNER JOIN states ON (orders.State = states.Id)
       `,
      {}
    )
    res.json(result)
    console.log(isAdmi)
  }
  if (isAdmi === 2) {
    const result = await actions.Select(
      `
      SELECT orders.Id, orders.DateTime, orders.Description, orders.Total, payment.PaymentMethod, users.Fullname, users.Adress, states.State
      FROM orders
      INNER JOIN users ON (orders.IdUser = users.Id)
      INNER JOIN payment ON (orders.Payment = payment.Id)
      INNER JOIN states ON (orders.State = states.Id)
      WHERE IdUser =:id`,
      { id: id }
    )
    res.json(result)
    console.log(isAdmi)
  }
})

router.post("/order", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const bodyOrders = req.body
  const orderInfo = bodyOrders.order
  const ordersDescriptionInfo = bodyOrders.orderDescription
  if (isAdmi === 1 || isAdmi === 2) {
    try {
      const result = await actions.Insert("INSERT INTO orders (DateTime, Payment, IdUser, State) VALUES (NOW(), :Payment, :IdUser, :State)", orderInfo)
      const idOrder = result[0]
      console.log(idOrder)

      for (const orderDescriptionInfo of ordersDescriptionInfo) {
        await actions.Insert("INSERT INTO orderdetails (IdOrder, IdProduct, Amount) VALUES (:idOrder, :IdProduct, :Amount)", { idOrder, ...orderDescriptionInfo })
      }

      const orderName = await actions.Select(
        `
      SELECT SUM(p.Price * do.Amount) as total,
      GROUP_CONCAT(do.Amount, "x ", p.Name, " ") as Description
      FROM orderdetails do
      INNER JOIN products p ON (p.Id = do.IdProduct)
      WHERE do.IdOrder = :idOrder`,
        { idOrder }
      )

      const resultOrderUpdate = await actions.Update(
        `UPDATE orders 
      SET Description = :Description, Total = :total WHERE Id = :idOrder`,
        { idOrder, Description: orderName[0].Description, total: orderName[0].total }
      )

      if (resultOrderUpdate.error) {
        res.status(500)
      } else {
        res.status(200).json({ success: true, orderName, message: "Your order have been accepted" })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.delete("/order/:id", auth.auth, auth.validateAdmi, async (req, res) => {
  const isAdmi = req.admi
  const resultQuery = await actions.Select("SELECT * FROM orders WHERE Id = :id", { id: req.params.id })
  if (isAdmi === 1) {
    const resultOrderDetails = await actions.Delete("DELETE FROM orderdetails WHERE IdOrder =:id", {
      id: req.params.id,
    })
    const resultOrder = await actions.Delete("DELETE FROM orders WHERE Id =:id", {
      id: req.params.id,
    })
    if (!resultQuery.length) {
      res.status(404).json({ succes: false, message: "Order not found" })
    } else {
      res.status(200).json({ succes: true, message: "Order has been Deleted" })
    }
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

router.patch("/order/:id", auth.auth, auth.validateAdmi, middlewares.validateBodyStateOrder, async (req, res) => {
  const isAdmi = req.admi
  const params = req.body
  const resultQuery = await actions.Select("SELECT * FROM orders WHERE Id = :id", { id: req.params.id })
  let result
  if (isAdmi === 1) {
    try {
      result = await actions.Update(`UPDATE orders SET State =:State WHERE Id =${req.params.id}`, params)
    } catch (error) {
      res.status(500).json(error)
    }
    if (!resultQuery.length) {
      res.status(404).json({ succes: false, message: "Order not found" })
    } else {
      res.status(200).json({ succes: true, message: "Order has been updated" })
    }
  } else {
    res.json({
      error: "This user has not authorization for make this request ",
      codeError: 01,
    })
  }
})

module.exports = router
