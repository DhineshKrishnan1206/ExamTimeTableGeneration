const { hashPassword, comparePassword } = require('../middlewares/passwordHelper');
const User = require('../models/user');

const register = async (req,res) => {
    try {
        const { username, email,role, password } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.json({error:"User Already exsists"})
        }
        const hashedPassword =await hashPassword(password);
        const user = await User.create({ username, email, role,password:hashedPassword });
            await user.save();
        return res.json({message:"User created Successfully"})
    } catch (error) {
        console.error(error);
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email });
      if (findUser) {
        const isPasswordValid = await comparePassword(password, findUser.password);
        if (isPasswordValid) {
          
          res.json({ message: "Login successful" });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" }); // Handle errors gracefully
    }
  };
  

module.exports = { register, login }