import fs from 'fs';

// input read
let file: string = fs.readFileSync('input', 'utf-8').trim();
let lines: string[] = file.split('\n');

// vars
let played: number[] = [];
let registers: Map<string, number> = new Map<string, number>();
let instructions: [(...args: string[]) => void, string[]][] = [];
let cursor: number = 0;

// util
function parseValue(value: string): number {
    if (isNaN(parseInt(value))) return registers.get(value)!;
    return parseInt(value);
}

// instructions
function snd(...args: string[]) {
    console.log("snd", args[0]);
    played.push(registers.get(args[0])!)
};
function set(...args: string[]) { console.log("set", args[0], args[1]); registers.set(args[0], parseValue(args[1])) };
function add(...args: string[]) { console.log("add", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) + parseValue(args[1])) };
function mul(...args: string[]) { console.log("mul", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) * parseValue(args[1])) };
function mod(...args: string[]) { console.log("mod", args[0], args[1]); registers.set(args[0], (registers.get(args[0]) || 0) % parseValue(args[1])) };
function rcv(...args: string[]) { console.log("rcv", args[0]); if ((registers.get(args[0]) || 0) > 0) { console.log("recovered!", played[played.length - 1]); cursor = instructions.length } };
function jgz(...args: string[]) { console.log("jgz", args[0], args[1]); if ((registers.get(args[0]) || 0) > 0) cursor += (parseValue(args[1]) - 1) };

// const
const functions: Map<string, () => void> = new Map<string, () => void>([
    ["snd", snd],
    ["set", set],
    ["add", add],
    ["mul", mul],
    ["mod", mod],
    ["rcv", rcv],
    ["jgz", jgz],
]);

// parse instructions
for (let line of lines) {
    let i: string[] = line.split(' ');
    let instruction: string | undefined = i.shift();
    instructions.push([functions.get(instruction!)!, i!]);
}

for (cursor = 0; cursor < instructions.length; cursor++) {
    let instruction = instructions[cursor];
    console.log(registers);
    instruction[0](...instruction[1]);
}