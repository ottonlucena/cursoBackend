const fs = require("fs");
const products = [];
const msg = [];

class Products {
  constructor() {
    this.items = products;
    this.data = msg;
  }

  async save(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail) {
      return null;
    }
    const newProduct = {
      id: this.items.length + 1,
      title,
      price,
      thumbnail,
    };
    this.items.push(newProduct);
    return this.items;
  }

  async saveMessage(email, text, time) {
    const user = {
      email,
      text,
      time,
    };
    this.data.push(user);
    return this.data;
  }
}

module.exports = Products;
