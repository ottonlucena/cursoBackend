const products = [
  /*  {
    id: 1,
    title: "Manzana",
    price: 123.44,
    thumbnail:
      "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg",
  },
  {
    id: 2,
    title: "Pera",
    price: 221.14,
    thumbnail:
      "https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg",
  },
  {
    id: 3,
    title: "Cambur",
    price: 33.98,
    thumbnail:
      "https://wikidat.com/img/cambur-ff289f22159dbaeea6e8c88f3a4c94e5.jpg",
  }, */
];

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
