import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import swaggerDocs from './swagger.js'
import { config } from "dotenv";

config()

const port =  process.env.PORT || 3000

import helmet from 'helmet' ;
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

const app = express();
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(helmet());  
app.use(cors());
app.use(xss());


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//routes 

import authRoutes from './routes/authRoutes.js'
 import blogRoutes from './routes/blogs.js'
 import AdminRoutes from './routes/admin.js'
 import contactRoutes from './routes/contactme.js'
//routes 
//using routes
//using routes


// database connection
// const dbURI = 'mongodb://127.0.0.1:27017/authopf';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{ 
    app.listen(port,()=>{
      console.log(`listening on port ${port}`)
    })
    swaggerDocs(app,port)    
  })
  .catch((err) => console.log(err));

// routes


app.get('/', (req, res) => res.send('home'));
app.use(blogRoutes)
app.use(AdminRoutes)
app.use(contactRoutes)
app.use(authRoutes);

export default app