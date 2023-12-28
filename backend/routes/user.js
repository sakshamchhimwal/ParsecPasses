import axios from 'axios';
import { config } from 'dotenv';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import qs from 'qs';
import { provideQRCodeLink } from '../middleware/addQRCode.js';
import { provideUUID } from '../middleware/addUUID.js';
import { checkEmailInUse } from '../middleware/checkEmailInUse.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import UserModel from '../models/UserModel.js';
import { sendEmail } from '../services/mailService.js';
import { UserSchemaValidationChain, userSchemaValidationMiddleware } from '../utils/schemaValidator.js';
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
      return res.render('form', { email: decodecJWT.email })
    } else {
      return res.redirect('/user/pass');
    }
  }
});

router.get('/pass', verifyJWT, async (req, res, next) => {
  const userEmailAddress = jwt.decode(req.cookies.id_token).email;
  const user = await UserModel.findOne({ email: userEmailAddress });
  if (user) {
    return res.send(`<img src="${user.qr_code_url}" /><p>${user.uuid}</p>`);
  } else {
    return res.redirect('/');
  }
})


router.post('/user', verifyJWT, checkEmailInUse, UserSchemaValidationChain, userSchemaValidationMiddleware, provideUUID, provideQRCodeLink, async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    const data = req.body;
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
    sendEmail(req.body.email, req.body.full_name, req.body.qr_code_url, req.body.uuid);
    return res.redirect('/user/pass');
  } else {
    return res.redirect('/user/pass');
  }
})

export default router;
