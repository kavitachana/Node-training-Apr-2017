'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable("accounts", (table) => {
        table.increments("id").primary();
        table.text("username").notNull().unique();
        table.text("hash").notNull();
        table.timestamp("createdOn").default(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("accounts");
};
