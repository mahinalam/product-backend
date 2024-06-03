// const express = require('express')
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/product/product.route'
const app: Application = express()
const port = 3000

//parsers
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoute)


export default app
