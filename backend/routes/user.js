import axios from 'axios';
import { config } from 'dotenv';
import { Router } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import qs from 'qs';
import { verifyJWT } from '../middleware/verifyJWT.js';
import UserModel from '../models/UserModel.js';
config();
const router = Router();



/* GET users listing. */
router.get('/', async (req, res, next) => {
  if (req.query.code) {
    const data = {
      grant_type: "authorization_code",
      code: req.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI
    }
    const result = await axios.post("https://oauth2.googleapis.com/token",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    const newToken = jwt.sign({
      email: jwt.decode(result.data.id_token).email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    res.cookie('id_token', newToken);
    res.redirect("/user");
  } else {
    const { id_token } = req.cookies;
    const decodecJWT = jwt.decode(id_token);
    const existingUser = await (UserModel.findOne({ email: decodecJWT.email }));
    if (!existingUser) {
      return next(createHttpError(404, "No such user exists"));
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}pass`);
    }
  }
});

router.get('/pass', verifyJWT, async (req, res, next) => {
  const userEmailAddress = req.body.email;
  const user = await UserModel.findOne({ email: userEmailAddress });
  if (user) {
    return res.send({ imageURL: user.qr_code_url, passID: user.uuid });
  } else {
    return next(createHttpError(403, 'No such user exists'));
  }
})


export default router;
