import fs from 'fs';

// input read
let file: string = fs.readFileSync('input', 'utf-8').trim();
let lines: string[] = file.split('\n');

class Queue {
    q: number[];

    public constructor() {
        this.q = [];
    }

    public publish(n: number) {
        this.q.push(n);
    }

    public consume(): number | undefined {
        if (this.q.length == 0) return undefined;
        else return this.q.shift();
    }
}

class Program {
    registers: Map<string, number>;
    instructions: [(...args: string[]) => void, string[]][];
    consumer: Queue;
    publisher: Queue;
    cursor: number;
    id: number;
    waiting: boolean;
    sendCount: number;
    iCount: number;

    public constructor(id: number, consumer: Queue, publisher: Queue) {
        this.id = id;
        this.registers = new Map<string, number>();
        this.registers.set('p', id);
        this.instructions = [];
        this.parseInstructions(lines);
        this.cursor = 0;
        this.waiting = false;
        this.sendCount = 0;
        this.consumer = consumer;
        this.publisher = publisher;
        this.iCount = 0;
    }

    public subscribe(q: Queue) { this.publisher = q; }

    public step() {
        if (this.cursor >= this.instructions.length) { this.waiting = true; return; }
        let instruction = this.instructions[this.cursor];
        instruction[0](...instruction[1]);
        if (!this.waiting) this.cursor++;
        this.iCount++;
    }

    parseValue = (value: string): number => {
        if (isNaN(parseInt(value))) return (this.registers.get(value) || 0);
        return parseInt(value);
    }

    parseInstructions = (lines: string[]): void => {
        // const
        const functions: Map<string, () => void> = new Map<string, () => void>([
            ["snd", this.snd],
            ["set", this.set],
            ["add", this.add],
            ["mul", this.mul],
            ["mod", this.mod],
            ["rcv", this.rcv],
            ["jgz", this.jgz],
        ]);

        // parse instructions
        for (let line of lines) {
            let i: string[] = line.split(' ');
            let instruction: string | undefined = i.shift();
            this.instructions.push([functions.get(instruction!)!, i!]);
        }
    }

    // instructions
    snd = (...args: string[]) => { this.publisher.publish(this.parseValue(args[0])); this.sendCount++; console.log(this.id, "snd", args, this.registers, this.cursor) };
    set = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[1])); console.log(this.id, "set", args, this.registers, this.cursor) };
    add = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[0]) + this.parseValue(args[1])); console.log(this.id, "add", args, this.registers, this.cursor) };
    mul = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[0]) * this.parseValue(args[1])); console.log(this.id, "mul", args, this.registers, this.cursor) };
    mod = (...args: string[]) => { this.registers.set(args[0], this.parseValue(args[0]) % this.parseValue(args[1])); console.log(this.id, "mod", args, this.registers, this.cursor) };
    rcv = (...args: string[]) => { let v = this.consumer.consume(); if (v == undefined) { this.waiting = true; } else { this.registers.set(args[0], v); this.waiting = false; }; console.log(this.id, "rcv", args, this.registers, this.cursor) };
    jgz = (...args: string[]) => { if (this.parseValue(args[0]) > 0) this.cursor += (this.parseValue(args[1]) - 1); console.log(this.id, "jgz", args, this.registers, this.cursor) };
}

let q0 = new Queue();
let q1 = new Queue();
let p0 = new Program(0, q0, q1);
let p1 = new Program(1, q1, q0);

while (!p0.waiting || !p1.waiting) {
    p0.step();
    p1.step();
};

console.log(p0.sendCount, p1.sendCount);
console.log(p0.registers, p1.registers);

// vars
// let played: number[] = [];
// let registers: Map<string, number> = new Map<string, number>();
// let instructions: [(...args: string[]) => void, string[]][] = [];
// let cursor: number = 0;

// util
// function parseValue(value: string): number {
//     if (isNaN(parseInt(value))) return registers.get(value)!;
//     return parseInt(value);
// }

// // instructions
// function snd(...args: string[]) { console.log("snd", args[0]); played.push(registers.get(args[0])!) };
// function set(...args: string[]) { console.log("set", args[0], args[1]); registers.set(args[0], parseValue(args[1])) };
// function add(...args: string[]) { console.log("add", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) + parseValue(args[1])) };
// function mul(...args: string[]) { console.log("mul", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) * parseValue(args[1])) };
// function mod(...args: string[]) { console.log("mod", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) % parseValue(args[1])) };
// function rcv(...args: string[]) { console.log("rcv", args[0]); if ((registers.get(args[0]) || 0) > 0) { console.log("recovered!", played[played.length - 1]); cursor = instructions.length } };
// function jgz(...args: string[]) { console.log("jgz", args[0], args[1]); if ((registers.get(args[0]) || 0) > 0) cursor += (parseValue(args[1]) - 1) };

// // const
// const functions: Map<string, () => void> = new Map<string, () => void>([
//     ["snd", snd],
//     ["set", set],
//     ["add", add],
//     ["mul", mul],
//     ["mod", mod],
//     ["rcv", rcv],
//     ["jgz", jgz],
// ]);

// // parse instructions
// for (let line of lines) {
//     let i: string[] = line.split(' ');
//     let instruction: string | undefined = i.shift();
//     instructions.push([functions.get(instruction!)!, i!]);
// }

// for (cursor = 0; cursor < instructions.length; cursor++) {
//     let instruction = instructions[cursor];
//     console.log(registers);
//     instruction[0](...instruction[1]);
// }

