import express from "express"
import passport from "passport"
import LocalStrategy from "passport-local"
import TwitterStrategy from "passport-twitter"
import FacebookStrategy from "passport-facebook"
import GoogleStrategy from "passport-google-oauth20"
import secretStorage, {twitterCredentials, facebookCredentials, googleCredentials} from "./../models/secretStorage"
import db from "./../models/sequelize"
import jwt from "jsonwebtoken"

const AuthInfo = db.import("./../models/sequelize/authinfo");
const User = db.import("./../models/sequelize/user");

const router = express.Router();

function checkAuthentication(idProperty, idPropertyValue, password, done) {
  AuthInfo.findOne({ where: {[idProperty]: idPropertyValue}}).then(auth => {
    if (!auth) {
      done(null, false, { code: 1001, message: 'User authentication info not found' });
    } else if (password && auth.password !== password) {
      done(null, false, { code: 1002, message: 'Password do not match' });
    } else {
      User.findOne({ where: {login: auth.login}}).then(user => {
        if (!user) {
          done(null, false, { code: 1003, message: 'User not found' });
        } else {
          done(null, user.get(), null);
        }
      });
    }
  });
}

function localAuthStrategyHandler() {
  return (username, password, done) => {
    checkAuthentication('login', username, password, done);
  }
}

function oauthStrategyHandler(userIdProperty) {
  return (token1, token2, profile, done) => {
    checkAuthentication(userIdProperty, profile.id, undefined, done);
  }  
}

function buildOAuthStrategyOptions(clientID, clientSecret, callbackPath) {
  return {
    consumerKey: clientID,
    consumerSecret: clientSecret,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:8090/api/auth" + callbackPath
  };
}

passport.use(new LocalStrategy(
  localAuthStrategyHandler()
));

passport.use(new TwitterStrategy(
  buildOAuthStrategyOptions(twitterCredentials.CONSUMER_KEY, twitterCredentials.CONSUMER_SECRET, "/twitter/callback"),
  oauthStrategyHandler('twitterProfileId')
));

passport.use(new FacebookStrategy(
  buildOAuthStrategyOptions(facebookCredentials.APP_ID, facebookCredentials.APP_SECRET, "/facebook/callback"),
  oauthStrategyHandler('facebookProfileId')
));

passport.use(new GoogleStrategy(
  buildOAuthStrategyOptions(googleCredentials.CLIENT_ID, googleCredentials.CLIENT_SECRET, "/google/callback"),
  oauthStrategyHandler('googleProfileId')
));

router.use(passport.initialize());

function authMiddleware(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, authInfo) => {
      if (err) { 
        console.log("auth err: ", err);
        return next(err); 
      }
    
      if (!user) { 
        console.log("auth fail, user is empty, authInfo: ", authInfo);
        return res.status(401).json(authInfo); 
      }
    
      console.log("auth success, generating jwt token for user: ", user);
      res.json({
        token: jwt.sign(user, secretStorage.JWT_SECRET_KEY, {expiresIn: 600})
      });
    }) (req, res, next);
  }
}

router.post('/', authMiddleware('local'));

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', authMiddleware('twitter'));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', authMiddleware('facebook'));

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', authMiddleware('google'));

export default router;