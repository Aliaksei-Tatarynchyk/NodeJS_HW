import db, {mongoose} from "./index"

const productSchema = mongoose.Schema({
  id: String,
  displayName: String,
  price: Number,
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function preSave(next) {
  this.lastModifiedDate = Date.now();
  next();
});

const Product = db.model('Product', productSchema);

const initialData = [
  new Product({
    id: "prd00556",
    displayName: "Macadamia Oil",
    price: 99.99
  }),
  new Product({
    id: "prd00487",
    displayName: "Obagi face care",
    price: 50
  })
];

initialData.forEach((item) => {
  item.save((err, product) => {
    if (err) throw new Error(err);
    console.log(`Product ${product.id} is added to MongoDB`);
  });
});

export default Product;