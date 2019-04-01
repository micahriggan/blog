import { Person, Car } from "./3-generalization-step-1";

class Table<RowType> {
  rows = new Array<RowType>();

  addRow(row: RowType) {
    this.rows.push(row);
  }

  getColumn(col: keyof RowType) {
    return this.rows.map(r => r[col]);
  }
}

function testTable() {
  const people = new Table<Person>()
  people.addRow({name: 'Micah', age: 25});

  const cars = new Table<Car>();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  cars.getColumn("modelName");
  cars.getColumn("year");
}

testTable();
