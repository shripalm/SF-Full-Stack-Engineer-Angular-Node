let tradesDb = require('../models/trades')
let { Op } = require("sequelize");

class tradeController {

  async createTrades(req, res) {
    try {
      let { body } = req
      // console.log("inside 1 controller", body)
      let data = await tradesDb.findAll({})
      body.id = data.length + 1
      if (body.shares < 1 || body.shares > 100) {
        res.sendStatus(400)
      }
      else if (body.type != "buy" && body.type != "sell") {
        res.sendStatus(400)
      } else {
        let response = await tradesDb.create(body)
        res.status(201).json(response)
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  async getAllTrades(req, res) {
    try {
      let body = req.query
      let data
      if (body?.type && body?.user_id) {
        if (body.type != "buy" && body.type != "sell") {
          data = []
        } else {
          data = await tradesDb.findAll({
            where: {
              type: body.type,
              user_id: body.user_id
            }
          })
        }
      }
      else if (body?.type && !body?.user_id) {
        if (body.type != "buy" && body.type != "sell") {
          data = []
        } else {
          data = await tradesDb.findAll({
            where: {
              type: body.type
            }
          })
        }
      }
      else if (body?.user_id && !body?.type) {
        data = await tradesDb.findAll({
          where: {
            user_id: body.user_id
          }
        })
      }
      else {
        data = await tradesDb.findAll({})
      }
      res.status(200).json(data)
    }
    catch (err) {
      console.error(err)
    }
  }

  async getTradesById(req, res) {
    try {
      let { id } = req.params
      let data
      if (id) {
        data = await tradesDb.findOne({
          where: { id }
        })
      }
      else {
        data = await tradesDb.findAll({})
      }
      if (data) {
        res.status(200).json(data)
      } 
      else{
        res.status(404).send("ID not found")
      }
    }
    catch (err) {
      throw new Error(err.message)
    }
  }

  async notAllowedPutDeletePatch(req, res){
      res.status(405).json({ message : "Not Allowed"})
  }

}

module.exports = new tradeController()