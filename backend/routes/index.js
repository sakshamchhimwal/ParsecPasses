import { Router } from 'express';
import getGoogleOAuthURL from '../utils/getGoogleURL.js';
const router = Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.query.user) {
    res.render('index', { title: 'Get Parsec Passes', link: getGoogleOAuthURL() });
  }
});

export default router;
