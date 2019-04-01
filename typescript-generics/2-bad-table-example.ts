interface Person {
  name: string;
  age: number;
}

interface Car {
  modelName: string;
  year: number;
}

class BadTable {
  rows = new Array<any>()

  addRow(row: any) {
    this.rows.push(row);
  }

  getColumn(col: keyof any) {
    return this.rows.map(r => r[col]);
  }
}
function testBadTable() {
  const people = new BadTable()
  people.addRow({name: 'Micah'});
  people.addRow({name: 'Micah', age: 25});

  const cars = new BadTable();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  cars.addRow({modelNme: 'Honda Something or Other', year: 2010});
  console.log(cars.getColumn("modelName"));
  console.log(cars.getColumn("year"));
  console.log(cars.getColumn("age")); // [undefined, undefined]
}

testBadTable();
