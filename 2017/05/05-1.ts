import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8");
let lines: string[] = f.trim().split('\n');
let steps: number[] = lines.map((line) => parseInt(line));
let position: number = 0;
let end: number = steps.length;
let stepCount: number = 0;


while (position < end) {
    let jump: number = steps[position];
    steps[position]++;

    position = position + jump;
    stepCount++;
}

console.log(stepCount);
