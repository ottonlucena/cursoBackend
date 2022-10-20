const knex = require("knex");

module.exports = class SQLClient {
  constructor(config, tableName) {
    this.knex = knex(config);
    this.tableName = tableName;

    this.knex.schema
      .hasTable(this.tableName)
      .then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("email", 100).notNullable();
            table.string("text").notNullable();
            table.string("time", 50).notNullable();
          });
        }
      })
      .catch((err) => console.log("err", err));
  }

  async saveMessages(message) {
    try {
      await this.knex(this.tableName).insert(message);
      console.log(`agregado`);
    } catch (error) {
      console.log(error.message);
    }
  }

  async selectAll() {
    try {
      const rows = await this.knex
        .from(this.tableName)
        .select("email", "text", "time");
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  disconnect() {
    this.knex.destroy();
  }
};
