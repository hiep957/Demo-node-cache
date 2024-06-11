import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import ApiError from "../untils/ApiError";
import instance from "../untils/CacheManager";
import { verifyToken, isAdmin } from "../middlewares/auth";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    
    const users = await User.find(); // Assuming you're using Mongoose
    res.status(200).json({cacheKey: instance.getStats(),users: users});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post(
  "/register",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new ApiError(400, "User already exists");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });
      await user.save();

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2h" }
      );

      res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",

  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(400, "User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApiError(400, "Password mismatch");
      }
      const cacheKey = `login_${user._id}`;
      instance.set(cacheKey, user, 3600);
    //   console.log("Cache đăng nhập: ", instance.get(cacheKey));
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2h" }
      );

      res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id, token: token });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/me",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = `login_${req.userId}`;
      let user = instance.get(cacheKey);

      if (!user) {
        user = await User.findById(req.userId).select("-password");
        if (!user) throw new ApiError(400, "User not found");

        // Lưu thông tin vào cache
        instance.set(cacheKey, user, 3600);
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "Logout successfully" });
});
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  try {
    console.log("checkvalidate");
    res.status(200).send({ userId: req.userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/admin", verifyToken, isAdmin, (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Admin access granted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get(
  "/admin/users",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    const cacheKey = "get_users_from_admin";
    try {
      let users = instance.get(cacheKey);
      console.log("Cache: ", instance.get(cacheKey));
      console.log("cache2", instance.getStats());
      if (!users) {
        users = await User.find();
        instance.set(cacheKey, users, 3600);
      }
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

//sửa thông tin người dùng
router.put(
  "/admin/:id",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update user information
      user.firstName = req.body.firstName || user.firstName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.lastName = req.body.lastName || user.lastName;
      user.phone = req.body.phone || user.phone;
      user.hometown = req.body.hometown || user.hometown;
      user.gender = req.body.gender || user.gender;
      // Add more fields as needed

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

//Xóa thông tin người dùng
router.delete(
  "/admin/users/:id",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      // Thực hiện logic xóa người dùng ở đây
      // Ví dụ:
      await User.findByIdAndDelete(userId);
      res.status(200).json({ msg: "User deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);
export default router;
