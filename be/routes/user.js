const { Router } = require("express");
const router = Router();
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const cookieParser=require('cookie-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

router.use(cookieParser());

router.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // Allow cookies to be sent and received
}));

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

router.use(errorHandler);

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  const userId = user._id;
  const name = user.firstName;
  console.log(userId);

  const token = jwt.sign({ userId, name }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async function (req, res) {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({ userId: user._id, name: user.firstName }, JWT_SECRET);
    return res.status(200).json({
      token: token,
    });
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

router.post("/send-otp-cookie", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({username:username});

  if(user)
  {
    const otp = generateOTP();

    const token = jwt.sign({ email: username, otp: otp, firstname: user.firstName,generatedAt: new Date()}, JWT_SECRET, { expiresIn: '120m' });

    res.cookie('userData', token, {
      maxAge: 2 * 60 * 60 * 1000,
    })
    res.status(200).json({
      msg:"cookies set",
      cookie:token
    });
  }
  else
  {
    res.status(404).json({
      msg:"given username does not exist"
    })
  }
});

router.post("/send-otp" , async (req,res) => {
  const {cookie} = req.body;
  
  try {
    jwt.verify(cookie, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({
          msg:"Try again",
          error:err
        });
      } else {
        res.status(200).json({
          otp:decoded.otp,
          firstName:decoded.firstname,
          email:decoded.email
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      msg:"Try again",
      error:error
    });
  }
  
})

router.post('/verify-otp', async (req, res) => {
  const {otp,token} = req.body;
  
  try {   
    const decoded = jwt.verify(token, JWT_SECRET);    
    const correctotp = decoded.otp;
    const otpTime = decoded.generatedAt;    

    if (correctotp != otp) {
      return res.status(204).json({ message: 'Invalid OTP' });
    }

    const currentTime = new Date();
    const tenMinutes = 10 * 60 * 1000;

    if (currentTime - new Date(otpTime) > tenMinutes) {
      // OTP expired
      return res.status(201).json({ message: 'OTP has expired' });
    }

    return res.status(200).json({ message: 'OTP verified successfully' });

  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {     
      console.log(err);
      
      return res.status(202).json({ message: 'Invalid token' });
    }
    return res.status(203).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

router.post('/reset-password', async (req,res) => {
  const {Password,token} = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    const email = decoded.email;
    const user = await User.findOne({username:email});
    
    if(user.password !== Password)
      {
        const result = await User.updateOne(
          { username: email },
          { $set: { password: Password } }
        );
      
      res.status(200).json({msg:"password reset successfully"});
    }
    else{
      res.status(201).json({msg:"new password can not be same as previous password"});
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log(error);
      
      return res.status(202).json({ message: 'Invalid token' });
    }
    return res.status(203).json({
      message: "Internal server error",
      error: error.message,
    });
  }

})

module.exports = router;