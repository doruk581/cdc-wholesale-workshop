const axios = require('axios')
const express = require("express")
const server = express()
const getApiEndpoint = "http://localhost:8081"

const getOrders = async () => {
    const res = await axios
      .get(`${getApiEndpoint}/orders`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.res
      })
    return res
  }

  const getOrder = async (id) => {
    const res = await axios
      .get(`${getApiEndpoint}/orders/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.res
      })
  return res
}

const addOrder = async (body) => {
    const res = await axios
    .post(`${getApiEndpoint}/orders`, body, {'Content-Type': 'application/json;charset=utf-8'})
    .then((res) => {
        return res
      })
      .catch((err) => {
        return err.res
      })
  return res
}

module.exports = {
    server,
    getOrders,
    getOrder,
    addOrder,
  };