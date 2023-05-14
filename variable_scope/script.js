/*  
    <#> https://www.freecodecamp.org/news/differences-between-var-let-const-javascript/

    Global Scope: Variables declared outside functions

    Local Scope: Variables declared inside functions

    Block Scope: Block scope is for variables declared in { }, if, loop, switch etc.

    Hoist: It refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code

    let and const have global, local and block scope and we cannot redeclare them, but let can be reassigned

    var has global and local scope and we can redeclare and reassign them

    It's recommended to use let and const instead of var

    Variables declared with var are hoisted to the top of their global or local scope, which makes them accessible before the line they are declared.

    Variables declared with let and const are hoisted to the top of their global, local, or block scope, but their hoisting is a little different from the one with var. let variables are hoisted without a default initialization. So when you try to access such variables, instead of getting undefined, or variable is not defined error, you get cannot access variable before initialization.

    let and const was introduced in ES6

*/

/* var local scope and global scope example */

// var number = 50;

// function square() {
//     var square = number * number;
//     console.log(square);
// }

// /* Here the number variable has a global scope so you can access it everywhere */
// console.log(number);
// square();

// function square() {
//     var number = 50;
//     square = number * number;
//     console.log(square);
// }

// /* Here the number variable is in square(), so it has a local scope. This means that the variable can only be accessed inside that function. Any attempt to access the variable outside square() will result in ReferenceError. */
// square()
// console.log(number);

/* var re-declaration and re-assignment example */

// var number; console.log(number);
// var number = 50; console.log(number);
// number = 100; console.log(number);

/* var hoisting example */

// // before execution the memory for the variable is allocated and it's assigned with a default value i.e undefined
// console.log(number);
// var number = 50;
// console.log(number);

/* global, local, and block scope example */

// // global scope
// let number = 50;

// function square() {
//   // local scope
//   let square = number * number;

//   if (number < 60) {
//     // block scope 
//     let largeNumber = 100;
//     console.log(square);
//     console.log(largeNumber);
//   }
//   // will throw error
//   // console.log(largeNumber);
// }

// square();
// console.log(number);

/*  let reassign variables example */

// let number = 50;
// console.log(number);

// number = 100;
// console.log(number);

/* let hoisting example */

// console.log(number);
// let number = 50;