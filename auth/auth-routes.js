import express from "express";
import User from "./auth-model";
import { hashPassword } from "../utils/passwordHelper";
import bcrypt from "bcryptjs";

const userRoutes = express.Router();

userRoutes.post("/register/", (req, res) => {
  let { username, email, password: pwd } = req.body;
  let password = hashPassword(pwd);
  const user = {
    username,
    email,
    password
  };
  User.insert(user)
    .then(data => {
      return res
        .status(201)
        .json({ message: "user  created successfully", data: user });
    })
    .catch(error => {
      if (error.code.includes("SQLITE_CONSTRAINT")) {
        return res.status(409).json({
          status: 409,
          error: "user cannot be registered twice"
        });
      } else {
        return res
          .status(500)
          .json({ error: "The users information could not be created." });
      }
    });
});

userRoutes.post("/login/", async (req, res) => {
  let { email, password: pwd } = req.body;
  const validUser = await User.getByEmail(email);
  let validPassword = validUser.password;
 

  try {
    const comparePassword = await bcrypt.compareSync(pwd, validPassword);
    if (validUser && comparePassword) {
      return res.status(200).json({ message: "user  login successfully" });
    } else {
      return res.status(400).json({ message: "wrong email or password, login not successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});
userRoutes.get("/users/", (req, res) => {
  User.get()
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({ message: "users not found" });
      }
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.get("/users/:id", (req, res) => {
  const { id } = req.params;
  User.getById(id)
    .then(data => {
      if (typeof data === "undefined") {
        return res.status(404).json({ message: `user with ${id} not found` });
      }
      res.status(200).json(data);
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.put("/users/:id", (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username,
    email,
    password
  };
  User.getById(id)
    .then(data => {
      if (typeof data === "undefined") {
        return res
          .status(404)
          .json({ message: `user with ID:${id} not found` });
      } else {
        User.update(id, user)
          .then(data => {
            return res
              .status(200)
              .json({ message: "user updated successfully", data: user });
          })
          .catch(error => {
            if (error.code.includes("SQLITE_CONSTRAINT")) {
              return res.status(409).json({
                status: 409,
                error: "The user name exists, please update with a new name"
              });
            } else {
              return res
                .status(500)
                .json({ error: "The users information could not be created." });
            }
          });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User.remove(Number(id))
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: `The user with the ${id} does not exist.` });
      }
      res
        .status(200)
        .json({ message: `The user with the ${id} has been removed` });
    })
    .catch(error => {
      return res.status(500).json({ error: "The user could not be removed" });
    });
});

export default userRoutes;
