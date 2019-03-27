const Book = {
  title: 'A book title',
  pages: 55,
  height: 100,
  weight: 2,
  price: 3.50
};
function test1() {
  const {title} = Book;
  console.log(title);
}
function test2() {
  const {title, pages} = Book;
  console.log({title, pages});
}
function test3() {
  const {height: bookHeight} = Book;
  console.log(bookHeight);
}
function test4() {
  const {ISBN = '0000000'} = Book;
  console.log(ISBN);
}
function test5() {
  const {title, ...rest} = Book;
  console.log(rest);
}
test1();
test2();
test3();
test4();
test5();
