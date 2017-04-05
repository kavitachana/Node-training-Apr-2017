'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", (table) => {
        table.increments("id").primary();
        table.text("nameFirst").notNull();
        table.text("nameLast").notNull();
        table.text("email").notNull();
        table.timestamp("hireDate").notNull();

        /* You might want to separate skills into a separate table, if
        you want the ability to add new skills on-demand (and to eg.
        compare skills between students). */
        table.integer("htmlSkill").default(0);
        table.integer("cssSkill").default(0);
        table.integer("jsSkill").default(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("students")
};
