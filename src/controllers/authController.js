import  User from "../models/User.js";
import jwt from  'jsonwebtoken';
import handleErrors from './errohandler.js';


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my name is joseph', {
    expiresIn: maxAge
  });
};

class  Users{
static async signup_post(req, res){
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, jwt: token });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

static async login_post(req, res){
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const bearerHeader = req.headers
    console.log(bearerHeader)
    
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });   
    res.status(200).json({ userID: user._id, token: token  });  
    
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}
static async logout_get(req, res){
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({
    statusCode: 200,
    message: 'logged out succefully'});
}
}

export default Users