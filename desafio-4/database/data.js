const products = [
  {
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
  },
];

class Products {
  constructor() {
    this.products = products;
  }

  async getAll() {
    return this.products;
  }

  async getById(number) {
    return this.products.find((product) => product.id === number);
  }

  async getFindIndex(id) {
    return this.products.findIndex((product) => product.id === Number(id));
  }

  async deleteProduct(id) {
    return this.products.filter((product) => product != id);
  }
}

module.exports = Products;
