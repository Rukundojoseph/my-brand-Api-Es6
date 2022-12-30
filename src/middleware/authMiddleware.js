import jwt from 'jsonwebtoken'
import  User from '../models/User.js'


const requireAuth = (req, res, next) => {  
  
  if (req.headers.authorization) {
    const token = (req.headers.authorization).split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(200).json({
          statusCode: 200,
          message: "logged in successfully"
        });
      } else {       
        next();
      }
    });
  } else {
    res.status(403).json({
      statusCode: 403,     
      message:'you are not logged in'
    });
  }
};
// check current user

//require admin
const requireAdmin = (req, res, next) => { 
if (req.headers.authorization) {
  const token = (req.headers.authorization).split(' ')[1]
  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);    
    } else {      
      let user = await User.findById(decodedToken.id);
      if(user.email == 'joseph@gmail.com')   
      {      
      next();      
      }
      else{
      res.status(403).json({
        statusCode: 403,        
        message: "you are not the admin"
      })
      }
      
    }
  });
} else {
  res.status(404).json({
    statusCode: 404,
    message:'you are not logged in'
  });
}
};

//require admin




export { requireAuth};
export {requireAdmin };
