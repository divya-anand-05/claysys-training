 const Defaultquestions = {
  HTML: [
    {
      question: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Mark Language",
        "None"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used for headings?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      answer: "<h1>"
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "Which attribute is used for images?",
      options: ["src", "href", "link", "path"],
      answer: "src"
    },
    {
      question: "HTML is a ___ language?",
      options: ["Programming", "Scripting", "Markup", "Query"],
      answer: "Markup"
    }
  ],

    CSS: [
        {
            question: "Which property is used to change text color?",
            options: ["color", "font-color", "text-color", "bgcolor"],
            answer: "color"
        },
        {
            question: "Which CSS property controls text size?",
            options: ["text-size", "font-style", "font-size", "size"],
            answer: "font-size"
        },
        {
            question: "Which property is used to change background color?",
            options: ["color", "bg-color", "background-color", "background"],
            answer: "background-color"
        },
        {
            question: "Which CSS property adds space inside an element?",
            options: ["margin", "spacing", "padding", "border"],
            answer: "padding"
        },
        {
            question: "Which property is used to make text bold?",
            options: ["font-weight", "font-style", "text-bold", "bold"],
            answer: "font-weight"
        }
    ],

   JavaScript: [
    {
        question: "Which keyword is used to declare a variable?",
        options: ["var", "init", "string", "float"],
        answer: "var"
    },
    {
        question: "Which symbol is used for single-line comments?",
        options: ["<!-- -->", "#", "//", "/* */"],
        answer: "//"
    },
    {
        question: "Which method prints output in the console?",
        options: ["print()", "log()", "console.log()", "display()"],
        answer: "console.log()"
    },
    {
        question: "Which data type stores true or false?",
        options: ["string", "number", "boolean", "array"],
        answer: "boolean"
    },
    {
        question: "Which operator is used to compare value and type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    }
]

  React: [
    {
      question: "React is a ___?",
      options: ["Framework", "Library", "Language", "Tool"],
      answer: "Library"
    },
    {
      question: "Which hook manages state?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      answer: "useState"
    },
    {
      question: "JSX stands for?",
      options: ["Java XML", "JavaScript XML", "JSON XML", "JS HTML"],
      answer: "JavaScript XML"
    },
    {
      question: "Which prop is mandatory in list rendering?",
      options: ["id", "index", "key", "value"],
      answer: "key"
    },
    {
      question: "React uses ___ data flow?",
      options: ["Two-way", "One-way", "Multi-way", "Circular"],
      answer: "One-way"
    }
  ],

  Angular: [
    {
      question: "Angular is developed by?",
      options: ["Facebook", "Google", "Microsoft", "Amazon"],
      answer: "Google"
    },
    {
      question: "Angular uses which language?",
      options: ["JavaScript", "TypeScript", "Python", "Java"],
      answer: "TypeScript"
    },
    {
      question: "Which symbol is used for data binding?",
      options: ["{}", "[]", "[()]", "<>"],
      answer: "[()]"
    },
    {
      question: "Component decorator name?",
      options: ["@Module", "@Service", "@Component", "@Inject"],
      answer: "@Component"
    },
    {
      question: "Angular CLI command to create app?",
      options: ["ng new", "ng add", "ng init", "ng create"],
      answer: "ng new"
    }
  ],

  "Vue.js": [
    {
      question: "Vue is created by?",
      options: ["Evan You", "Dan Abramov", "Brendan Eich", "Mark Zuckerberg"],
      answer: "Evan You"
    },
    {
      question: "Which directive is for condition?",
      options: ["v-for", "v-if", "v-bind", "v-model"],
      answer: "v-if"
    },
    {
      question: "Two-way binding uses?",
      options: ["v-bind", "v-if", "v-model", "v-on"],
      answer: "v-model"
    },
    {
      question: "Vue file extension?",
      options: [".js", ".vue", ".html", ".ts"],
      answer: ".vue"
    },
    {
      question: "Vue is mainly used for?",
      options: ["Backend", "Frontend", "Database", "Testing"],
      answer: "Frontend"
    }
  ],

  "C#": [
    {
      question: "C# is developed by?",
      options: ["Google", "Microsoft", "Apple", "IBM"],
      answer: "Microsoft"
    },
    {
      question: "Which keyword defines a class?",
      options: ["struct", "class", "object", "define"],
      answer: "class"
    },
    {
      question: "Which method is entry point?",
      options: ["start()", "main()", "Main()", "run()"],
      answer: "Main()"
    },
    {
      question: "C# runs on?",
      options: ["JVM", ".NET CLR", "Browser", "Python VM"],
      answer: ".NET CLR"
    },
    {
      question: "Which type stores true/false?",
      options: ["int", "bool", "string", "char"],
      answer: "bool"
    }
  ],

  Java: [
    {
      question: "Java is ___?",
      options: ["Platform dependent", "Platform independent", "Script", "Markup"],
      answer: "Platform independent"
    },
    {
      question: "Which keyword creates object?",
      options: ["new", "create", "make", "init"],
      answer: "new"
    },
    {
      question: "Java runs on?",
      options: ["JVM", "CLR", "Browser", "OS"],
      answer: "JVM"
    },
    {
      question: "Which keyword inherits class?",
      options: ["extends", "implements", "inherits", "super"],
      answer: "extends"
    },
    {
      question: "Which datatype stores decimal?",
      options: ["int", "float", "char", "boolean"],
      answer: "float"
    }
  ],

  Python: [
    {
      question: "Python is ___ language?",
      options: ["Compiled", "Interpreted", "Assembly", "Binary"],
      answer: "Interpreted"
    },
    {
      question: "Which symbol is for comments?",
      options: ["//", "#", "/* */", "--"],
      answer: "#"
    },
    {
      question: "Which keyword defines function?",
      options: ["func", "define", "def", "method"],
      answer: "def"
    },
    {
      question: "Which datatype stores key-value?",
      options: ["list", "tuple", "dict", "set"],
      answer: "dict"
    },
    {
      question: "Python file extension?",
      options: [".js", ".java", ".py", ".cs"],
      answer: ".py"
    }
  ],

  SQL: [
    {
      question: "SQL stands for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Sequential Query Language",
        "None"
      ],
      answer: "Structured Query Language"
    },
    {
      question: "Which command retrieves data?",
      options: ["GET", "FETCH", "SELECT", "READ"],
      answer: "SELECT"
    },
    {
      question: "Which clause filters records?",
      options: ["WHERE", "FROM", "ORDER", "GROUP"],
      answer: "WHERE"
    },
    {
      question: "Which key uniquely identifies row?",
      options: ["Foreign Key", "Primary Key", "Index", "Unique"],
      answer: "Primary Key"
    },
    {
      question: "Which command removes table?",
      options: ["DELETE", "DROP", "REMOVE", "CLEAR"],
      answer: "DROP"
    }
  ],

    MySQL: [
    {
      question: "MySQL is a ___?",
      options: ["Programming Language", "Database", "Operating System", "Web Server"],
      answer: "Database"
    },
    {
      question: "MySQL is mainly used for?",
      options: [
        "Storing and managing data",
        "Designing UI",
        "Running Java code",
        "Creating animations"
      ],
      answer: "Storing and managing data"
    },
    {
      question: "Which command is used to create a database?",
      options: ["MAKE DATABASE", "CREATE DATABASE", "ADD DATABASE", "NEW DATABASE"],
      answer: "CREATE DATABASE"
    },
    {
      question: "Which keyword is used to retrieve data?",
      options: ["FETCH", "SELECT", "GET", "READ"],
      answer: "SELECT"
    },
    {
      question: "Which engine is default in MySQL?",
      options: ["MyISAM", "InnoDB", "MongoEngine", "Postgres"],
      answer: "InnoDB"
    }
  ],


  MongoDB: [
    {
      question: "MongoDB is ___ database?",
      options: ["Relational", "NoSQL", "Graph", "File"],
      answer: "NoSQL"
    },
    {
      question: "Data is stored as?",
      options: ["Tables", "Rows", "Documents", "Columns"],
      answer: "Documents"
    },
    {
      question: "MongoDB uses which format?",
      options: ["XML", "CSV", "JSON", "BSON"],
      answer: "BSON"
    },
    {
      question: "Which command shows databases?",
      options: ["show dbs", "list db", "get db", "display db"],
      answer: "show dbs"
    },
    {
      question: "MongoDB primary key?",
      options: ["id", "_id", "key", "primary"],
      answer: "_id"
    }
  ]
};
