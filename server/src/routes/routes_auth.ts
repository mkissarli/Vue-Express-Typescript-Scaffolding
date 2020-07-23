import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/register", (req, res, next) =>
  passport.authenticate("local-signup", {
    successRedirect: "/talent",
    failureRedirect: "/register",
    failureFlash: true,
  })(req, res)
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local-login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occurred: ");
        return res.json({
          message: "Invalid login details.",
          status: 403,
        })
      }
      req.login(user, async (err) => {
        if (err) { return next(err); }
        const body = { _id: user._id, email: user.email };
        return res.json({
          message: "Login successful.",
          body: body,
          status: 200,
        });
      });
    } catch (error) {
      return res.json({
        message: "Something funky.",
        status: 500,
      })
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({
    message: "Logged out.",
    status: 200,
  })
});

module.exports = router;