import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: "mysql://etienneP:blue@127.0.0.1:3306/pizza-pasta"
  }
};

module.exports = config;
