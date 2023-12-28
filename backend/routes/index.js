import { Router } from 'express';
import getGoogleOAuthURL from '../utils/getGoogleURL.js';
const router = Router();

router.get('/', function (req, res, next) {
  return res.send({ googleOAuthLink: getGoogleOAuthURL() }).status(200);
});

export default router;
