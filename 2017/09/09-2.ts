import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8");
// f = "{{{<!garbagesum>}}}";
let acc: number = 0;
let sum: number = 0;
let garbage: boolean = false;
let garbagesum: number = 0;

for (let i = 0; i < f.length; i++) {
    if (garbage) {
        switch (f[i]) {
            case "!": {
                i++;
                break;
            }
            case ">": {
                garbage = false;
                break;
            }
            default: {
                garbagesum++;
            }
        }
    } else {
        switch (f[i]) {
            case "{": {
                acc++;
                break;
            }
            case "}": {
                sum += acc;
                acc--;
                break;
            }
            case "<": {
                garbage = true;
                break;
            }
        }
    }
}

console.log(garbagesum);