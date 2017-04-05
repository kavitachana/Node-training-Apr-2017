'use strict';

exports.up = function(knex, Promise) {
    return Promise.try(() => {
        return knex.schema.createTable("locations", (table) => {
            table.increments("id").primary();
            table.string("name").notNull();
        });
    }).then(() => {
        return knex.schema.createTable("items", (table) => {
            table.increments("id").primary();
            table.string("description").notNull();
            table.integer("amount").notNull();
            table.integer("locationId").notNull().references("id").inTable("locations");
        });
    });
};

exports.down = function(knex, Promise) {
    return Promise.try(() => {
        return knex.schema.dropTable("items");
    }).then(() => {
        return knex.schema.dropTable("locations");
    });
};
