import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../model/userModel.js";

export const register = async (req, res) => {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const newUser = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        status: req.body.status,
        passwordHash: hash,
      });
  
      const user = await newUser.save();
  
      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret",
        {
          expiresIn: "90d",
        }
      );
  
      const { passwordHash, ...userData } = newUser.toObject();
  
      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не вдалося зареєструватися",
      });
    }
};

  
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Користувач не знайдений",
            });
        }

        console.log("User:", user);

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(404).json({
                message: "Неправильний логін або пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user.toObject();

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалося авторизуватися",
        });
    }
};


export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            res.status(404).json({
                message: "Користувача не знайдено",
            });
        }

        const { passwordHash, ...userData } = user.toObject();

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Немає доступу",
        });
    }
};

export const remove = async(req, res) => {
    try {
        const userId = req.params.id;

        UserModel.findByIdAndDelete({
            _id: userId,
        }).then(doc => {
            if(!doc) {
                return res.status(404).json({
                    message: "Користувача не знайдено",
                });
            }

            res.json({
                success: true,
            });

        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: "Не вдалося видалити користувача",
            })
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Користувача з таким іменем не знайдено",
        })
    }
}