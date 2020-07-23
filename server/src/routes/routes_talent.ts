import express from "express";
import passport, { deserializeUser } from "passport";

import { isAuth } from "../config/auth";

const router = express.Router();

router.get(
  "/",
  isAuth,
  (req, res, next) => {
      return res.json({
        message: "GET method on talent res.",
        user: { user_Id: req.user._id, email: req.user.email },
        status: 200,
      });
  }
);

router.post("/", (req, res) => {
  return res.send("POST method on talent res.");
});

router.put(
  "/",
  isAuth,
  (req, res) => {
    
    return res.json({
      message: "Updated user: " + req.user._id + ".",
      user: { user_Id: req.user._id, email: req.user.email },
      status: 200,
    });
  }
);

router.delete("/:user_Id", (req, res) => {
  return res.send("DELETE method on talent/" + req.params.user_Id + " res.");
});

module.exports = router;