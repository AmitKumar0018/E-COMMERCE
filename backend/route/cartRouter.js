import express from 'express'
import {AddToCart,updateCart,GetUserCart} from '../controller/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/get',authUser,GetUserCart)
cartRouter.post('/add',authUser,AddToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter