export interface Person {
  name: string;
  age: number;
}

export interface Car {
  modelName: string;
  year: number;
}

class PersonTable {
  rows = new Array<Person>();
  addRow(row: Person) {
    this.rows.push(row);
  }
  getColumn(col: keyof Person) {
    return this.rows.map(r => r[col]);
  }
}


class CarTable {
  rows = new Array<Car>();
  addRow(row: Car) {
    this.rows.push(row);
  }
  getColumn(col: keyof Car) {
    return this.rows.map(r => r[col]);
  }
}

function testTables() {
  const people = new PersonTable()
  //people.addRow({name: 'Micah'});
  people.addRow({name: 'Micah', age: 25});

  const cars = new CarTable();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  //cars.addRow({modelNme: 'Honda Something or Other', year: 2010});
  cars.getColumn("modelName");
  cars.getColumn("year");
  //cars.getColumn("age");
}

testTables();
