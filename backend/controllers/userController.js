import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const RegisterUser = async (req, res) => {
  const { name, surname, email, password, country, city, zip, street, nr } =
    req.body;

  if (name && surname && email && password) {
    User.findOne({ name: name }, function (err, data) {
      if (!data) {
        bcrypt.hash(password, 5, (err, hash) => {
          const newUser = new User({
            name: name,
            surname: surname,
            email: email,
            password: hash,
            orders: [],
            address: {
              country: country,
              city: city,
              zip: zip,
              street: street,
              nr: nr,
            },
          });
          newUser.save(function async(error) {
            error
              ? res.send({ Error: "An unexpected error, please check data" })
              : res.send({ Success: "You are regestered,You can login now." });
          });
        });
      } else {
        res.send({ Error: "email already registered" });
      }
    });
  } else {
    res.send({ Error: "Empty spaces" });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    User.findOne({ email: email }, function (err, data) {
      if (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (result) {
            jwt.sign(
              { id: data._id },
              "key123",
              { expiresIn: "30d" },
              (err, token) => {
                res.send({
                  token,
                });
              }
            );
          } else {
            res.send({ Error: "Wrong password" });
          }
        });
      } else {
        res.send({ Error: "User not found" });
      }
    });
  } else {
    res.send({ Error: "Empty spaces" });
  }
};

const GetUserData = async (req, res) => {
  jwt.verify(req.token, "key123", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.id }, function (err, data) {
        res.send(data);
      });
    }
  });
};

const AddOrder = async (req, res) => {
  const { id, cart, total } = req.body;
  User.findOneAndUpdate(
    { _id: id },
    { $push: { orders: {products:cart,status:"recived",total:total }} },
    function (err, data) {
      if (data) {
        res.send({ Success: "Order recived!" });
      }
    }
  );
};

export { RegisterUser, LoginUser, GetUserData, AddOrder };
