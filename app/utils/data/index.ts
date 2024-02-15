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
    }
]