// TYPE ANNOTATION
let username = "Divyadharshini";
let age = 22;
let isActive = true;
console.log("Username:", username);
console.log("Age:", age);
console.log("Active:", isActive);
// TYPE INFERENCE
// TypeScript automatically detects type
let city = "Chennai"; // inferred as string
let marks = 95; // inferred as number
let passed = true; // inferred as boolean
console.log("City:", city);
console.log("Marks:", marks);
//ARRAY TYPES
let numbers = [10, 20, 30];
let skills = ["HTML", "CSS", "Angular"]; // inferred as string[]
console.log("Numbers:", numbers);
console.log("Skills:", skills);
//ANY TYPE
let randomValue = "Hello";
console.log("Any type:", randomValue);
randomValue = 100; // allowed
console.log("Changed Any type:", randomValue);
// UNKNOWN TYPE (Safer than any)
let userInput = "Divya";
if (typeof userInput === "string") {
    console.log("Length of userInput:", userInput.length);
}
// Creating object using interface
let student1 = {
    name: "Divya",
    age: 22,
    course: "Angular"
};
console.log("Student:", student1);
// CLASS
class Person {
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // Method
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
// Create object from class
let person1 = new Person("Divya", 22);
person1.greet();
// ARROW FUNCTION
// Arrow function with type annotation
const add = (a, b) => {
    return a + b;
};
console.log("Addition:", add(10, 5));
//  FUNCTION WITH INTERFACE TYPE
const printStudent = (student) => {
    console.log(`Student Name: ${student.name}`);
    console.log(`Course: ${student.course}`);
};
printStudent(student1);
export {};
//# sourceMappingURL=main.js.map