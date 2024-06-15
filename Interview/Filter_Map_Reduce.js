const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* forEach */
// Numbers.forEach((Number) => console.log(Number));
// const newNumbers = Numbers.forEach((Number) => console.log(Number));
// console.log(newNumbers);//forEach kisui return kore na

/* filter */
// const newNumbers = Numbers.filter((Number) => Number < 4);
// const newScopeNumbers = Numbers.filter((Number) => {
//   return Number > 4 && Number % 2 === 0;
// }); //Scope start korlei Return must
// console.log(newNumbers);
// console.log(newScopeNumbers);

/* map */
//map ar forEach pray same just forEach kisu return kore na mane kono new collection create kore na but map seta kore
// const newNumbers = Numbers.map((Number) => Number * 3).filter(
//   (Number) => Number % 2 != 0
// ); //etake bole chaining
// console.log(newNumbers);

/* reduce */
const price = [104, 555, 999];
const initialValue = 0;
const total = price.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, initialValue);
// same jinis just with arrow function
// const total = price.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   0
// );
//first e accumulator = initialValue
//pore  e  accumulator = total (evabei cholte thake)
console.log(`Total price of the order is ${total}`);
