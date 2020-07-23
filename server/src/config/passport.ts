/// Use the Header <credentials:include> to use in insomnia.
/// SECURITY FLAAWWWWW??? DO I NEED TO ENCRYPT THE PASSWORD WHEN SENDING IT OFF??? <-- Don't acc think this is actually an issue.
import bcrypt from "bcrypt";

import User from "../components/user/user_model";

var LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport: any) {
  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    await User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      generic_local_signup(User)
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      generic_local_login(User)
    )
  );
};

function generic_local_signup(user_type: any) {
  return (req: any, email: string, password: string, done: any) => {
    process.nextTick(() => {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      user_type.findOne({ email: email }, async (err: any, user: any) => {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }
        // check to see if theres already a user with that email
        if (user) {
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );
        } else {
          // if there is no user with that email
          var new_user = new user_type();
          new_user.email = email;

          var saltRounds = 23;
          await bcrypt.genSalt(saltRounds, async (err: any, salt: any) => {
            return await bcrypt.hash(
              password,
              salt,
              async (err: any, hash: any) => {
                if (err) {
                  return done(err);
                } else {
                  //return await hash;
                  new_user.password = hash;
                  // save the user
                  new_user.save((err: any) => {
                    if (err) {
                      throw err;
                    }
                    //console.log("We saved: ", new_user);
                    return done(null, new_user);
                  });
                }
              }
            );
          });
        }
      });
    });
  };
}

function generic_local_login(user_type: any) {
  return (req: any, email: string, password: string, done: any) => {
    process.nextTick(() => {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      user_type.findOne({ email: email }, (err: any, user: any) => {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }
        // check to see if theres already a user with that email
        if (user) {
          bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
            if (err) {
              throw err;
            } else if (!isMatch) {
              // On match.
              return done(null, user);
            } else {
              // On no match.
              // if there is no user with that email
              return done(null, false, req.flash("loginMessage", "Invalid login."));
            }
          });
        } else {
          // if there is no user with that email
          return done(null, false, req.flash("loginMessage", "Invalid login."));
        }
      });
    });
  };
}