import express from "express";
import { signinController, signupController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", signupController);
router.post("/sign-in", signinController);
router.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Authenticated", userId: req.userId });
});

export default router;