const express=require('express')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const contactController=require('./controllers/contact')
const Contact=require('./models/Contact')

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//connect db
//connect servercls

mongoose.connect(process.env.MONGODB_URL)



app.use('/identify',contactController)
app.listen(process.env.PORT, ()=>{ 

console.log('Server is connected succssfully on port 5000')})
