import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "../config/firebase.js";
import { User } from "../models/user.model.js";

export const login = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(firebaseApp).verifyIdToken(token);
    console.log(decoded)
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
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `login error ${error}`,
    });
  }
};
