// var let and const
// var = function scope
// let = block scope

function variable() {
  let i = 1;
  {
    for (i; i < 5; i++) {
      console.log(i);
    }
    console.log(i);
  }
}

variable();
