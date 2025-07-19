import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js'

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//route for login user
const loginUser = async(req,res)=>{
 try {
  const {email,password} = req.body

  const user = await userModel.findOne({email})
  //checks user exists or not
  if(!user){
    return res.json({success : false, message : "User Does not Exists"})
  }

  //if exists checks password is correct or not
  const isMatch = await bcrypt.compare(password,user.password)

  if(isMatch){
    const token = createToken(user._id)

    res.json({success : true, token})
  }
  //if password does not match
  else{
    res.json({success : false ,message : "Invalid Credenials"})
  }

 } catch (error) {
  console.log(error);
  res.json({success : false ,message:error.message})
 }
}

//route for register user
const registerUser = async(req,res)=>{
  try {

    const {name,email,password} = req.body

    //checks user exists or not
    const exists = await userModel.findOne({email})
    if(exists){
     return res.json({success : false, message : "User Already Exists"})
    }

    //checks user email in correct format and strong password
    if(!validator.isEmail(email)){
     return res.json({success : false, message : "Please Enter a valid Email"})
    }
    if(password .length < 8){
     return res.json({success : false, message : "Please Enter a strong password"})
    }

    //hashing of user password
    const salt = await bcrypt.genSalt(10)
    const hasshedPassword = await bcrypt.hash(password,salt)

    //create a new user and save data in database
    const newUser = new userModel({
      name,
      email,
      password : hasshedPassword
    })

    const user = newUser.save()

    //create token for user
    const token = createToken(user._id)

    res.json({success : true , token})

  } catch (error) {
    console.log(error);
    res.json({success : false ,message:error.message})
    
  }
}

//route for admin login
const adminLogin = async(req,res)=>{
 try {
  const {email,password} = req.body
  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    const token = jwt.sign(email+password, process.env.JWT_SECRET)
    res.json({success : true, token})
  }else{
    res.json({success : false, message:"Invalid credenials"})
  }
 } catch (error) {
  console.log(error);
  res.json({success : false ,message:error.message})
 }
}

export {loginUser,registerUser,adminLogin}