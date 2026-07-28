import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "../config/firebase.js";
import { User } from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";

export const login = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(firebaseApp).verifyIdToken(token);

    let user = await User.findOne({
      firebaseUID: decoded.uid,
    });
    if (!user) {
      user = await User.create({
        email: decoded.email,
        firebaseUID: decoded.uid,
        name: decoded.name,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: `login error ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`);

    res.clearCookie("session");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {}
};
