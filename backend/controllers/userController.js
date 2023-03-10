import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'

//@desc Auth user & get token
//@route POST /api/users/login
//access public

const authUser = asyncHandler(async(req,res) =>{
const { email, password } = req.body;

const user = await User.findOne({email})

if(user && (await user.matchPassword(password))){

  res.json({
    _id: user._id, 
    name: user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token: generateToken(user._id),
  })
} else {
    res.status(401)
    throw new Error('Invaild email and password')
}

})


//@desc Get user profile
//@route GET /api/users/profile
//access private

const getUserProlie = asyncHandler(async(req,res) =>{
 
  const user = await User.findById(req.user._id);

  if(user){
    res.json({
      _id: user._id, 
      name: user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })

  }else {
    res.status(404);
    throw new Error('User not found')
  }

  })

//@desc Update user profile
//@route PUT /api/users/profile
//access private

const updateUserProlie = asyncHandler(async(req,res) =>{
 
  const user = await User.findById(req.user._id);

  if(user){
   user.name = req.body.name || user.name
   user.email =  req.body.email || user.email
   if(req.body.password){
    user.password = req.body.password
   }
   const updateUser = await user.save();
    
    res.json({
    _id: updateUser._id, 
    name: updateUser.name,
    email:updateUser.email,
    isAdmin:updateUser.isAdmin,
    token: generateToken(updateUser._id),
  })

  }else {
    res.status(404);
    throw new Error('User not found')
  }

  })




//@desc Register a new user
//@route POST /api/users/
//access public

const regsiterUser = asyncHandler(async(req,res) =>{
  const { name, email, password } = req.body;
  
  const userExits = await User.findOne({email})

  if(userExits){
    res.status(400);
    throw new Error('User Already Exits');
  }
    const user = await User.create({
      name,
      email,
      password
    })

    if(user){
     res.status(201).json({
      _id: user._id, 
      name: user.name,
      email:user.email,
      isAdmin:user.isAdmin,
     })
    }else {
      res.status(400);
      throw new Error('Invalid user data');  
    }

  

  })

//@desc Get all users
//@route GET /api/users
//access Private/Admin

const getUser = asyncHandler(async(req,res) =>{
 
  const users = await User.find({});
  res.json(users)

  })
  
//@desc Delete Single user
//@route DELETE /api/users/:id
//access Private/Admin

  const deleteUser = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id);
    
    if(user){
        await user.remove();
        res.json({message: 'User removed'})
    }else {
      res.status(404);
      throw new Error('User not found');
    }
  
    })

//@desc Get all users
//@route GET /api/users/:id
//access Private/Admin

const getUserById = asyncHandler(async(req,res) =>{
  const user = await User.findById(req.params.id).select('-password');
  
  if(user){
    res.json(user)
  } else {
    res.status(404);
    throw new Error('User not found');
  }
 

  })


//@desc Update user
//@route PUT /api/users/:id
//access Private/Admin

const updateUser = asyncHandler(async(req,res) =>{
 
  const user = await User.findById(req.params.id);

  if(user){
   user.name = req.body.name || user.name
   user.email =  req.body.email || user.email
   user.isAdmin =  req.body.isAdmin
   if(req.body.password){
    user.password = req.body.password
   }

   console.log('in backend area');
   console.log(user);
   const updateUser = await user.save();
    
    res.json({
    _id: updateUser._id, 
    name: updateUser.name, 
    email:updateUser.email,
    isAdmin:updateUser.isAdmin,
  })

  }else {
    res.status(404);
    throw new Error('User not found')
  }

  })
  
    

export { authUser, getUserProlie, updateUserProlie, regsiterUser, getUser, deleteUser, getUserById, updateUser} 