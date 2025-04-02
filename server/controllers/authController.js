import USER from "../models/userModel.js";

// sign up

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, cPassword } = req.body;
  if (!email || !password || !firstName || !lastName || !cPassword) {
    res
      .status(400)
      .json({
        success: false,
        errMsg: "all fields are required for registration",
      });
    return;
  }

  if (password !== cPassword) {
    res.status(400).json({ success: false, errMsg: "password do not match" });
    return;
  }

  if (password.lenght < 8) {
    res
      .status(400)
      .json({ success: false, errMsg: "min password lenght must be 8 chrs" });
    return;
  }

  try {
    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ success: false, errMsg: "Email already exists" });
      return;
    }

    const user = await USER.create({ ...req.body });
    res
      .status(201)
      .json({ success: true, message: "registration successful", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// sign in

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, errMsg: "all fields are required to sign in" });
      return;
    }
    // finding a registered email address
    const user = await USER.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, errMsg: "user not found" });
      return;
    }

    // comparing password and validating password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, errMsg: "Email or password is incorrect" });
      return;
    }
    // generating token
    const token = await user.generateToken();
    if (token) {
      res.status(200).json({
        succcess: true,
        message: "signed in successfully",
        user: {
          role: user.role,
          firstname: user.firstName,
          token,
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// forgot password
export const forgotpassword = async(req,res)=>{
    const {email} = req.body;
    try {
       if(!email){
           res.status(400).json({success:false,errMsg:"email is required"});
           return;
       } 

       const user = await USER.findOne({email});
       if(!user){
           res.status(404).json({success:false,errMsg:"email not found"});
           return;
       }

       const resetToken = user.getResetPasswordToken();
       console.log(resetToken);
       await user.save();
       res.status(201).json({success:true,message:"mail sent"});
       

    } catch (error) {
        res.status(500).json(error.message);
    }
}