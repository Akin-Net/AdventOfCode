class Program {
    cursor: number;
    counter: number;
    instructions: [(...args: string[]) => void, string[]][];
    registers: Map<string, number>;

    public constructor(lines: string[]) {
        this.cursor = 0;
        this.counter = 0;
        this.registers = new Map<string, number>();
        this.registers.set('a', 1);
        this.instructions = [];
        this.parseInstructions(lines)
    }

    run = () => {
        for (this.cursor = 0; this.cursor < this.instructions.length; this.cursor++) {
            let instruction = this.instructions[this.cursor];
            instruction[0](...instruction[1]);
        }
    }

    parseValue = (value: string): number => {
        if (isNaN(parseInt(value))) return (this.registers.get(value) || 0);
        return parseInt(value);
    }

    parseInstructions = (lines: string[]): void => {
        // const
        const functions: Map<string, () => void> = new Map<string, () => void>([
            ["set", this.set],
            ["sub", this.sub],
            ["mul", this.mul],
            ["jnz", this.jnz],
        ]);

        // parse instructions
        for (let line of lines) {
            let i: string[] = line.split(' ');
            let instruction: string | undefined = i.shift();
            this.instructions.push([functions.get(instruction!)!, i!]);
        }
    }

    // instructions
    set = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[1])); console.log("set", args, this.registers, this.cursor) };
    sub = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[0]) - this.parseValue(args[1])); console.log("sub", args, this.registers, this.cursor) };
    mul = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[0]) * this.parseValue(args[1])); this.counter++; console.log("mul", args, this.registers, this.cursor) };
    jnz = (...args: string[]) => { if (this.parseValue(args[0]) != 0) this.cursor += (this.parseValue(args[1]) - 1); console.log("jnz", args, this.registers, this.cursor) };
}

import fs from 'fs';

let filename = 'input2';
let f: string = fs.readFileSync(filename, 'utf-8');
let lines: string[] = f.split('\n');

let p = new Program(lines);
p.run();
console.log(p.registers);
