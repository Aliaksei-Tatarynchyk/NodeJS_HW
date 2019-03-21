import db, {mongoose} from "./index"

const userSchema = mongoose.Schema({
  login: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: /.*?@.*?\..*?/
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function preSave(next) {
  this.lastModifiedDate = Date.now();
  next();
});

const User = db.model('User', userSchema);

const initialData = [
  new User({
    login: "admin",
    email: "brymda1990@gmail.com",
    firstName: "Aliaksei",
    lastName: "Tatarynchyk"
  }),
  new User({
    login: "anon",
    email: "anon@zoo.com",
    firstName: "Anonymous",
    lastName: "Pupkin"
  })
];

initialData.forEach((item) => {
  item.save((err, user) => {
    if (err) throw new Error(err);
    console.log(`User ${user.login} is added to MongoDB`);
  });
});

export default User;