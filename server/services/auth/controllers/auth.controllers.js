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
      `user-session-${user._id}`,
      sessionId,
      "EX",
      7 * 24 * 60 * 60,
    );
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `login error ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      res.clearCookie("session", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      return res.status(200).json({
        success: true,
        message: "Already logged out",
      });
    }

    // Get session data before deleting it
    const sessionData = await redis.get(`session-${sessionId}`);

    if (sessionData) {
      const { userId } = JSON.parse(sessionData);

      // Delete user -> session mapping
      await redis.del(`user-session-${userId}`);
    }

    // Delete session
    await redis.del(`session-${sessionId}`);

    // Clear browser cookie
    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: `Logout failed: ${error.message}`,
    });
  }
};

export const updateUserPlan = async (req, res) => {
  try {
    const { plan, credits, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.save();

    const sessionId = await redis.get(`user-session-${user?._id}`);
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Failed to update user plan ${error.message}`,
    });
  }
};

export const deductCredits = async (req, res) => {
  try {
    const { userId, agent } = req.body;
    const COST = {
      chat: 1,
      search: 5,
      coding: 10,
      pdf: 10,
      ppt: 10,
      vision: 10,
    };

    if (!agent || !COST[agent]) {
      return res.status(400).json({
        message: `Invalid agent: ${agent}`,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const requiredCredits = COST[agent] || 1;

    if (!Number.isFinite(user.credits)) {
      return res.status(500).json({
        message: "User has invalid credit balance",
      });
    }
    if (!Number.isFinite(user.totalCredits)) {
      return res.status(500).json({
        message: "User has invalid total credits",
      });
    }

    if (user.credits < requiredCredits) {
      return res.status(400).json({
        message: "Not enough credits.",
        requiredCredits,
        availableCredits: user.credits,
      });
    }

    user.credits -= requiredCredits;

    await user.save();

    const sessionKey = `user-session-${user?._id}`;

    const sessionId = await redis.get(sessionKey);

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );
    return res.status(200).json({
      success: true,
      agent,
      deductedCredits: requiredCredits,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Failed to deduct credits ${error.message}`,
    });
  }
};
