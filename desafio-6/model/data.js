const fs = require("fs");
const products = [];

class Products {
  constructor() {
    this.items = products;
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

  async getAll() {
    return this.items;
  }

  async getById(number) {
    return this.items.find((product) => product.id === number);
  }

  async getFindIndex(id) {
    return this.items.findIndex((product) => product.id === Number(id));
  }

  async deleteProduct(id) {
    return this.items.filter((product) => product != id);
  }

  async deleteProductAll() {
    return [];
  }
}

module.exports = Products;
