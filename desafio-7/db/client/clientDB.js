const knex = require("knex");

module.exports = class SQLDBclient {
  constructor(config, tableName) {
    this.knex = knex(config);
    this.tableName = tableName;

    this.knex.schema
      .hasTable(this.tableName)
      .then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("title", 100).notNullable();
            table.string("price").notNullable();
            table.string("thumbnail", 50).notNullable();
          });
        }
      })
      .catch((err) => console.log("err", err));
  }

  async saveProduct(product) {
    const { title, price, thumbnail } = product;

    const newProduct = {
      title,
      price,
      thumbnail,
    };

    try {
      await this.knex(this.tableName).insert(newProduct);
      console.table(newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async productAll() {
    try {
      const products = await this.knex
        .from(this.tableName)
        .select("title", "price", "thumbnail");
      console.table(products);
    } catch (error) {
      console.log(error);
    }
  }
};
