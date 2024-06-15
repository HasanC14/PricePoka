/* Access */
// const user = {
//   First_name: "Hasan",
//   "Last name": "chowdhury",
//   salam: function () {
//     console.log(`Assalamua-laikum,${this.First_name}`);
//   },
// };
// console.log(user.salam());
// user.First_name = "Tushar";
// Object.freeze(user);
// user.First_name = "Hasib";

// console.log(user.First_name);
// console.log(user["First_name"]);
// console.log(user["Last name"]); //jate eker besi word holeo access kora jai

/* Symbol */
// const MySymbol = Symbol("key");
// const user = {
//   [MySymbol]: "Hasan",
//   "Last name": "chowdhury",
// };
// console.log(user[MySymbol]);
// console.log(user);
// //Using symbols allows different parts of your codebase to create properties with the same "name" (symbol), without any risk of accidentally overwriting each other's data. Each symbol is a unique identifier, providing separation and avoiding conflicts between different modules or components.

/* Assign */
const obj1 = { 1: "a", 2: "b" };
const obj2 = { 3: "a", 4: "b" };
const obj3 = { 5: "a", 6: "b" };

const obj4 = Object.assign(obj3, obj1, obj2);
//sobsomoi first(obj3) er ta hobe target mane oikhane jaia sob gula joma hobe
console.log(obj4);
