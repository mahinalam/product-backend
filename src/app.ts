// const express = require('express')
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/product/product.route'
import { orderRoute } from './app/modules/order/order.route'
import { notFoundRoute } from './app/middlewares/not-found'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use(notFoundRoute)


export default app
