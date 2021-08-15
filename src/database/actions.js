const Sequelize = require("sequelize")
const database = new Sequelize("mysql://root:blackberry1@localhost:3306/deliahresto") //Cadena de conexión

module.exports.Select = async (query, data) => {
  return await database.query(query, {
    replacements: data,
    type: database.QueryTypes.SELECT,
  })
}

module.exports.Insert = async (query, data) => {
  return await database.query(query, {
    replacements: data,
    type: database.QueryTypes.INSERT,
  })
}

module.exports.Update = async (query, data) => {
  return await database.query(query, {
    replacements: data,
    type: database.QueryTypes.UPDATE,
  })
}

module.exports.Delete = async (query, data) => {
  return await database.query(query, {
    replacements: data,
    type: database.QueryTypes.DELETE,
  })
}
