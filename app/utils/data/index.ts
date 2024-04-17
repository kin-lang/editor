import { Program } from "../types";

export const samplePrograms: Program[] = [
    {
        name: "Hello World",
        code: `console.log('Hello, World!')`
    },
    {
        name: "Fibonacci",
        code: `function fibonacci(n) {
              if (n <= 1) return 1;
              return fibonacci(n - 1) + fibonacci(n - 2);
            }
            console.log(fibonacci(10));`
    },
    {
        name: "Print Numbers 1 to 10",
        code: `for (let i = 1; i <= 10; i++) {
              console.log(i);
            }`
    },
    {
        name: "Factorial",
        code: `function factorial(n) {
              if (n === 0 || n === 1) return 1;
              return n * factorial(n - 1);
            }
            console.log(factorial(5));`
    },
    {
        name: "Array Sum",
        code: `const numbers = [1, 2, 3, 4, 5];
            const sum = numbers.reduce((acc, curr) => acc + curr, 0);
            console.log(sum);`
    },
    {
        name: "Square Roots",
        code: `const numbers = [4, 9, 16, 25];
            const roots = numbers.map(num => Math.sqrt(num));
            console.log(roots);`
    },
    {
        name: "Check Prime Number",
        code: `function isPrime(num) {
              for (let i = 2; i < num; i++)
                if (num % i === 0) return false;
              return num > 1;
            }
            console.log(isPrime(13));`
    },
    {
        name: "Reverse String",
        code: `const str = 'Hello, World!';
            const reversed = str.split('').reverse().join('');
            console.log(reversed);`
    },
    {
        name: "Filter Odd Numbers",
        code: `const numbers = [1, 2, 3, 4, 5];
            const oddNumbers = numbers.filter(num => num % 2 !== 0);
            console.log(oddNumbers);`
    },
    {
        name: "Simple Calculator",
        code: `function add(a, b) {
              return a + b;
            }
            console.log(add(5, 3));`
    }
]