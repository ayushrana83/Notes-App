import { Request, Response } from "express";
import { User } from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const signUpController = async (req: Request, res: Response) => {
  try {
    // console.log("signup");
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      res.status(404).json({ message: "all fields required" });
      return;
    }
    if(password !== confirmPassword)
    {
      res.status(400).json({ message: "Password does not Match" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "email already used" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ message: "user created successfully" });
    // console.log(res);

    return;
  } catch (error) {
    res.status(400).json({ message: "error in signUpController", error });
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    // console.log("login");
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
      res.status(400).json({ message: "all fields required" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "invalid credentials" });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.status(401).json({ message: "wrong password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "login successfull" });
    // console.log(res);
    return;
  } catch (error) {
    res.status(500).json({ message: "error in login ", error });
    return;
  }
};

export const logoutController = (req : Request , res : Response) => {
  try {
    res.clearCookie("token");
    // console.log("logout")
    res.status(200).json({message : "logout succesfull" });
    return;
  } catch (error) {
    console.log("error in logout" , error);
    return;
  }
}

