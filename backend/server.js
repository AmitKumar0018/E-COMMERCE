import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCLOUDINARY from './config/cloudinary.js'
import userRouter from './route/userRouter.js'
import productRouter from './route/productRouter.js'
import cartRouter from './route/cartRouter.js'
import orderRouter from './route/orderRouter.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCLOUDINARY()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('api is working')
})

app.listen(port,()=>console.log('server is on PORT :' + port))
