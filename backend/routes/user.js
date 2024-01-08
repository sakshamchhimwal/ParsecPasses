import axios from 'axios';
import { config } from 'dotenv';
import { Router } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import qs from 'qs';
import { verifyJWT } from '../middleware/verifyJWT.js';
import UserModel from '../models/UserModel.js';
import { UserSchemaValidationChain, userSchemaValidationMiddleware } from '../utils/schemaValidator.js';
import { checkEmailInUse } from "../middleware/checkEmailInUse.js";
import { provideQRCodeLink } from "../middleware/addQRCode.js";
import { provideUUID } from "../middleware/addUUID.js";
import {sendEmail} from "../services/mailService.js"
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

router.post('/register', verifyJWT, checkEmailInUse, UserSchemaValidationChain, userSchemaValidationMiddleware, provideUUID, provideQRCodeLink, async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const data = req.body;
      // console.log(data);
      const newUser = await UserModel.create({
        uuid: data.uuid,
        email: data.email,
        full_name: data.full_name,
        college_name: data.college_name,
        year: data.year,
        branch: data.branch,
        date_of_birth: data.date_of_birth,
        mobile_number: data.mobile_number,
        qr_code_url: data.qr_code_url
      });
      sendEmail(req.body.email, req.body.full_name, req.body.qr_code_url, req.body.image, req.body.uuid);
      return res.send({ message: "User registered successfully" }).status(200);
    } else {
      return res.send({ message: "User with this email already exists." }).status(409);
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(503, "Internal Server Error"));
  }
})

export default router;
