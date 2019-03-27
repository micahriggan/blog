"use strict";
class Table {
    constructor() {
        this.rows = new Array();
    }
    addRow(row) {
        this.rows.push(row);
    }
    getColumnNames() {
        const names = new Set();
        for (const row of this.rows) {
            for (const key of Object.keys(row)) {
                names.add(key);
            }
        }
        return Array.from(names.values());
    }
    getColumn(col) {
        return this.rows.map(r => r[col]);
    }
    getRow(num) {
        return this.rows[num];
    }
    indexBy(col) {
        return this.rows.reduce((agg, cur) => Object.assign(agg, { [cur[col].toString()]: cur }), {});
    }
}
function testTable() {
    const people = new Table();
    // fail: missing property age
    // people.addRow({name: 'Micah'})
    people.addRow({ name: 'Micah', age: 25 });
    // fail: ssn is not a property of Person
    // people.getColumn('ssn');
    console.log(people.getColumn("name"));
    console.log(people.indexBy('name'));
}
testTable();
