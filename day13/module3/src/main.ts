
// TYPE ANNOTATION


let username: string = "Divyadharshini";
let age: number = 22;
let isActive: boolean = true;

console.log("Username:", username);
console.log("Age:", age);
console.log("Active:", isActive);



// TYPE INFERENCE


// TypeScript automatically detects type

let city = "Chennai";      // inferred as string
let marks = 95;            // inferred as number
let passed = true;         // inferred as boolean

console.log("City:", city);
console.log("Marks:", marks);



//ARRAY TYPES


let numbers: number[] = [10, 20, 30];
let skills = ["HTML", "CSS", "Angular"]; // inferred as string[]

console.log("Numbers:", numbers);
console.log("Skills:", skills);

let numberArray: Array<number> =[10,20];



//ANY TYPE


let randomValue: any = "Hello";
console.log("Any type:", randomValue);

randomValue = 100;   // allowed
console.log("Changed Any type:", randomValue);



// UNKNOWN TYPE (Safer than any)


let userInput: unknown = "Divya";

if (typeof userInput === "string") {
  console.log("Length of userInput:", userInput.length);
}

  //NEVER TYPE

  function throwError(): never{
    throw new Error("Something went wrong");
  }

//VOID TYPE

function greet():void{
  console.log("Hello");
}



// INTERFACE


interface Student {
  name: string;
  age: number;
  course: string;
}

// Creating object using interface
let student1: Student = {
  name: "Divya",
  age: 22,
  course: "Angular"
};

console.log("Student:", student1);



// CLASS


class Person {
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Create object from class
let person1 = new Person("Divya", 22);
person1.greet();



// ARROW FUNCTION


// Arrow function with type annotation
const add = (a: number, b: number): number => {
  return a + b;
};

console.log("Addition:", add(10, 5));

//GENERICS

function printData<T>(data: T): T {
  return data;
}
printData<string>("Hello");
printData<number>(100);
printData<boolean>(true);

// Access Modifiers

class Employee {

  public name: string;
  private id: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.id = age;
  }

  public getAge(): number {
    return this.id;
  }
}

let e1 = new Employee("Divya", 1);

console.log(e1.name);       //  allowed
// console.log(e1.age);     error (private)

console.log(e1.getAge());   // allowed


//PROTECTED
// class Person {
//   protected salary: number = 50000;
// }

// class Employee extends Person {
//   showSalary() {
//     console.log(this.salary);  //  allowed
//   }
// }