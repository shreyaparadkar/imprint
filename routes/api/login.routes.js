const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../DB/models/user.model");
const validateLoginData = require('../../validator/login');

const key = process.env.KEY;

router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          jwt.sign(
            {
              name: user.name
            },
            key,
            { expiresIn: 86400 },
            function (err, token) {
              res.status(200).json({ token });
            }
          );
        }
        else {
          res
            .status(401)
            .json({ msg: "Incorrect password" });
        }
      } else if (!user) {
        res.status(400).json({ msg: "User does not exists" });
      }
    })
    .catch((err) => {
      res.status(400).json(false);
      console.log(err);
    });
  });
  

module.exports = router;