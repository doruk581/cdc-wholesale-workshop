const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("./repository")

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

server.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8")
    next()
  })

const orderRepository = new Repository()

// Load order data into a repository object
const importData = () => {
    const data = require("./data/orderData.json")
    data.reduce((a, v) => {
      v.id = a + 1
      orderRepository.add(v)
      return a + 1
    }, 0)
  }

// Get all orders
server.get("/orders", (req, res) => {
    res.json(orderRepository.fetchAll())
  })

// Find order by ID
server.get("/orders/:id", (req, res) => {
    const response = orderRepository.getById(req.params.id)
    if (response) {
      res.end(JSON.stringify(response))
    } else {
      res.status(404)
      res.send({message: 'Order not found!'})
      res.end()
    }
  })  

// Add a new Order
server.post("/orders", (req, res) => {
    const order = req.body
  
    // Basic validation for missing first name field
    if (!order || !order.firstName) {
      res.status(400)
      res.send({message:'Missing first name!', body: req.body})
      res.end()
  
      return
    }
  
    order.id = orderRepository.fetchAll().length + 1
    orderRepository.add(order)
  
    res.json(order)
  })  

  module.exports = {
    server,
    importData,
    orderRepository,
  }  