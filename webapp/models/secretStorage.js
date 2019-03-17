export default {
  JWT_SECRET_KEY: 'jwtSecret',
  TWITTER_CONSUMER_KEY: 'TWITTER_CONSUMER_KEY',
  TWITTER_CONSUMER_SECRET: 'TWITTER_CONSUMER_SECRET',
  FACEBOOK_APP_ID: '266665100883899',
  FACEBOOK_APP_SECRET: '770ba6caab9a46e8f0476bcef87472cb',
  GOOGLE_CLIENT_ID: '43832197179-sc5fosc7oajnd8l1c3631ft0jv79rqfn.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'GMKn49xuIEPDj16JGPs1Rg81'
}

const auth = [{
  login: "admin",
  password: "Admin123",
  twitterProfileId: "",
  facebookProfileId: "",
  googleProfileId: "107232008032104519591"
}, {
  login: "fakeUser",
  password: "Fake123",
  twitterProfileId: "",
  facebookProfileId: "3169235779768958",
  googleProfileId: ""
}, {
  login: "fakeNonExistentUser",
  password: "Fake123",
  twitterProfileId: "",
  facebookProfileId: "",
  googleProfileId: ""
}];

export { auth }