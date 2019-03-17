const products = [{
  id: "prd00556",
  displayName: "Macadamia Oil",
  price: 99.99
}, {
  id: "prd00487",
  displayName: "Obagi face care",
  price: 50
}];

const users = [{
  login: "admin",
  email: "admin@gmail.com"
}, {
  login: "fakeUser",
  email: "anon@zoo.com"
}];

const reviews = [{
  productId: "prd00556",
  author: "Anna",
  review: `It's a very cool oil, I like it so much so I want to buy it more and more. 
  The only thing that upset me is the price - it's quite expensive...`
},{
  productId: "prd00556",
  author: "Pavel",
  review: `I've bought it for my wife, she told me that she is really happy, but, god's heaven, why it's so expensive???`
},{
  productId: "prd00487",
  author: "Anonymous",
  review: `I'll just leave it here`
}];

export {products, users, reviews};