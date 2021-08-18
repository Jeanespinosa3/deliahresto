const express = require("express")
const router = express.Router()
const actions = require("../database/actions")

router.get("/orders", (req, res) => {
  //Code here
  res.send("no hay ordenes")
})

router.get("/order/:id", (req, res) => {
  //Code here
})

router.post("/order", async (req, res) => {
  const bodyOrders = req.body
  const orderInfo = bodyOrders.order
  const ordersDescriptionInfo = bodyOrders.orderDescription

  const result = await actions.Insert("INSERT INTO orders (DateTime, Payment, IdUser, State) VALUES (NOW(), :Payment, :IdUser, :State)", orderInfo)
  const idOrder = result[0]
  console.log(idOrder)

  for (const orderDescriptionInfo of ordersDescriptionInfo) {
    await actions.Insert("INSERT INTO orderdetails (IdOrder, IdProduct, Amount) VALUES (:idOrder, :IdProduct, :Amount)", { idOrder, ...orderDescriptionInfo })
  }

  const resultQueryName = await actions.Select(
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
    { idOrder, Description: resultQueryName[0].Description, total: resultQueryName[0].total }
  )

  if (resultOrderUpdate.error) {
    res.status(500)
  } else {
    res.json(resultOrderUpdate)
  }
})

router.put("/order/:id", (req, res) => {
  //Code here
})

router.delete("/order/:id", (req, res) => {
  //Code here
})

module.exports = router
