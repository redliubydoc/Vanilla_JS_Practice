// in global context this refers to window object in browser and global object in node


// const person1 = {
//     firstName: "John",
//     lastName: "Doe"
// };

// const person2 = {
//     firstName: "Alex",
//     lastName: "Lee"
// };

// function greet(calledFrom) {
//     console.log(`${this.firstName} ${this.lastName} ${calledFrom}`);
// }

// greet("@ global");

// // bind 
// const greetPerson1 = greet.bind(person1);
// const greetPerson2 = greet.bind(person2);

// greetPerson1("@ greetPerson1");
// greetPerson2("@ greetPerson2");

// // call
// greet.call(person1, "@ greet.call()");
// greet.call(person2, "@ greet.call()");

// // apply
// greet.apply(person1, ["@ greet.apply()"]);
// greet.apply(person2, ["@ greet.apply()"]);

/* In a constructor function this does not have a value. It is a substitute for the new object. The value of this will become the new object when a new object is created */
function Person(firstName, lastName) {
    
    this.firstName = firstName;
    this.lastName = lastName;
    
    this.greet = function(calledFrom) {
        console.log(`${this.firstName} ${this.lastName} ${calledFrom}`);
    };

    // callback functions takes the global context
    setTimeout(function() {
        console.log(this);
    }, 1000);
}

const person3 = new Person("Rajesh", "Gupta");
person3.greet("@ person3.greet()");
