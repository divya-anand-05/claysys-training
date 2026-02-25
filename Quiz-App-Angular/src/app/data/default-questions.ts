export interface Question {
  question: string;
  options: string[];
  answer: string;
}

// Add index signature [key: string]: Question[]
export const Defaultquestions: { [key: string]: Question[] } = {
    JavaScript: [
    { question: "Which keyword declares a block-scoped variable?", options: ["var","let","define","int"], answer: "let" },
    { question: "Which method converts JSON to object?", options: ["JSON.parse()","JSON.stringify()","JSON.convert()","JSON.toObject()"], answer: "JSON.parse()" },
    { question: "Which symbol is used for strict equality?", options: ["=","==","===","!="], answer: "===" },
    { question: "Which function is used to print in console?", options: ["console.print()","print()","console.log()","log()"], answer: "console.log()" },
    { question: "Which keyword is used for function?", options: ["func","function","define","method"], answer: "function" }
  ],

  HTML: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Text Markup Language","Home Tool Markup Language","Hyperlinks Text Mark Language"], answer: "Hyper Text Markup Language" },
    { question: "Which tag creates a paragraph?", options: ["<p>","<para>","<text>","<h1>"], answer: "<p>" },
    { question: "Which tag is used for images?", options: ["<img>","<image>","<pic>","<src>"], answer: "<img>" },
    { question: "Which attribute gives unique id?", options: ["class","id","name","key"], answer: "id" },
    { question: "Which tag creates a hyperlink?", options: ["<a>","<link>","<href>","<url>"], answer: "<a>" }
  ],

  CSS: [
    { question: "Which property sets text color?", options: ["color","font-color","text-color","bgcolor"], answer: "color" },
    { question: "Which property sets background color?", options: ["bgcolor","background-color","color","background-style"], answer: "background-color" },
    { question: "Which property controls font size?", options: ["font-style","text-size","font-size","size"], answer: "font-size" },
    { question: "Which property makes text bold?", options: ["font-weight","text-bold","bold","font-style"], answer: "font-weight" },
    { question: "Which symbol is used for class selector?", options: [".","#","*","@"], answer: "." }
  ],

  React: [
    { question: "React is mainly used for?", options: ["Database","UI building","Backend","Testing"], answer: "UI building" },
    { question: "Which hook is used for state?", options: ["useEffect","useState","useRef","useMemo"], answer: "useState" },
    { question: "JSX stands for?", options: ["Java Syntax Extension","JavaScript XML","JSON XML","Java Extended"], answer: "JavaScript XML" },
    { question: "Which method renders React to DOM?", options: ["ReactDOM.render()","renderDOM()","React.mount()","mountDOM()"], answer: "ReactDOM.render()" },
    { question: "Props are?", options: ["Functions","Arguments passed to components","State variables","Hooks"], answer: "Arguments passed to components" }
  ],

  Angular: [
    { question: "Angular is written in?", options: ["Java","Python","TypeScript","C#"], answer: "TypeScript" },
    { question: "Which directive is used for loops?", options: ["*ngIf","*ngFor","*ngLoop","*ngSwitch"], answer: "*ngFor" },
    { question: "Which file defines routes?", options: ["app.module.ts","app.component.ts","app-routing.module.ts","main.ts"], answer: "app-routing.module.ts" },
    { question: "Which decorator defines component?", options: ["@NgModule","@Component","@Injectable","@Directive"], answer: "@Component" },
    { question: "Which command starts Angular app?", options: ["ng build","ng start","ng serve","npm serve"], answer: "ng serve" }
  ],

  "Vue.js": [
    { question: "Vue is used for?", options: ["Backend","Database","Frontend UI","Testing"], answer: "Frontend UI" },
    { question: "Which directive is used for binding?", options: ["v-if","v-bind","v-for","v-model"], answer: "v-bind" },
    { question: "Which directive is used for loops?", options: ["v-loop","v-if","v-for","v-each"], answer: "v-for" },
    { question: "Which directive is used for two-way binding?", options: ["v-bind","v-if","v-model","v-show"], answer: "v-model" },
    { question: "Vue instance is created using?", options: ["new Vue()","createVue()","Vue.create()","initVue()"], answer: "new Vue()" }
  ],

  "C#": [
    { question: "C# is developed by?", options: ["Google","Microsoft","Apple","IBM"], answer: "Microsoft" },
    { question: "Which keyword defines a class?", options: ["define","class","struct","object"], answer: "class" },
    { question: "Which method is entry point?", options: ["Start()","Run()","Main()","Init()"], answer: "Main()" },
    { question: "Which symbol is used for namespace?", options: ["namespace","package","using","import"], answer: "namespace" },
    { question: "C# runs on?", options: [".NET","JVM","Node","Browser"], answer: ".NET" }
  ],

  Java: [
    { question: "Java is platform?", options: ["Dependent","Independent","Browser-based","Script"], answer: "Independent" },
    { question: "Which method is entry point?", options: ["main()","start()","run()","init()"], answer: "main()" },
    { question: "Java code runs on?", options: ["CLR","JVM","Node","Browser"], answer: "JVM" },
    { question: "Which keyword creates object?", options: ["create","new","object","class"], answer: "new" },
    { question: "Java is?", options: ["Compiled","Interpreted","Both","None"], answer: "Both" }
  ],

  Python: [
    { question: "Python is?", options: ["Low-level","High-level","Machine language","Assembly"], answer: "High-level" },
    { question: "Which symbol starts comment?", options: ["//","#","/*","--"], answer: "#" },
    { question: "Which keyword defines function?", options: ["function","def","func","define"], answer: "def" },
    { question: "Python is dynamically typed?", options: ["Yes","No","Partially","None"], answer: "Yes" },
    { question: "Which data type is list?", options: ["[]","{}","()","<>"], answer: "[]" }
  ],

  SQL: [
    { question: "SQL stands for?", options: ["Structured Query Language","Simple Query Language","Standard Query List","Sequential Query Language"], answer: "Structured Query Language" },
    { question: "Which command retrieves data?", options: ["GET","SELECT","FETCH","RETRIEVE"], answer: "SELECT" },
    { question: "Which clause filters data?", options: ["WHERE","FILTER","SORT","GROUP"], answer: "WHERE" },
    { question: "Which command deletes table?", options: ["DELETE","REMOVE","DROP","CLEAR"], answer: "DROP" },
    { question: "Which keyword sorts data?", options: ["SORT","ORDER BY","ARRANGE","GROUP BY"], answer: "ORDER BY" }
  ],

  MySQL: [
    { question: "MySQL is?", options: ["Programming language","Database","Framework","Browser"], answer: "Database" },
    { question: "MySQL uses which language?", options: ["HTML","SQL","Java","Python"], answer: "SQL" },
    { question: "Which command creates database?", options: ["NEW DATABASE","CREATE DATABASE","MAKE DB","INIT DB"], answer: "CREATE DATABASE" },
    { question: "Which engine is default?", options: ["MyISAM","InnoDB","Memory","CSV"], answer: "InnoDB" },
    { question: "MySQL is owned by?", options: ["Microsoft","Google","Oracle","IBM"], answer: "Oracle" }
  ],

  MongoDB: [
    { question: "MongoDB is?", options: ["Relational","NoSQL","SQL-based","Spreadsheet"], answer: "NoSQL" },
    { question: "Data is stored as?", options: ["Tables","Rows","Documents","Columns"], answer: "Documents" },
    { question: "MongoDB uses format?", options: ["XML","JSON-like BSON","CSV","SQL"], answer: "JSON-like BSON" },
    { question: "Which command inserts data?", options: ["insertOne()","add()","create()","push()"], answer: "insertOne()" },
    { question: "Default port of MongoDB?", options: ["3000","8080","27017","5000"], answer: "27017" }
  ]
};