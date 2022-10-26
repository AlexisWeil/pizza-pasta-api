import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: "mysql://user:password@localhost:3306/pizza-pasta"
  }
};

module.exports = config;
