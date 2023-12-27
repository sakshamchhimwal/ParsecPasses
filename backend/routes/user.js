import { config } from 'dotenv';
config();
import { Router } from 'express';
import qs from 'qs';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { UserSchemaValidationChain, userSchemaValidationMiddleware } from '../utils/schemaValidator.js';
import { provideUUID } from '../middleware/addUUID.js';
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
    console.log(result.data);
    res.cookie("id_token", result.data.id_token)
    res.redirect("/user");
  } else {
    const { id_token } = req.cookies;
    const decodecJWT = jwt.decode(id_token);
    res.render('form', { email: decodecJWT.email })
  }
});


router.post('/register', provideUUID, UserSchemaValidationChain, userSchemaValidationMiddleware, async (req, res, next) => {
  console.log(req.body.uuid);
  res.send("Success")
})

export default router;
