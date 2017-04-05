'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable("interests", (table) => {
        table.increments("id").primary();
        table.integer("studentId").notNull().references("id").inTable("students");
        table.text("name").notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("interests");
};
