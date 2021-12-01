import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8");
let lines: string[] = f.trim().split('\n');

let lineRegex = /(?<register>[a-z]+) (?<operator>[a-z]+) (?<number>-?[0-9]+) if (?<condition>.+)/i;
let conditionRegex = /(?<register>[a-z]+) (?<conditional>[><!=]+) (?<number>-?[0-9]+)/i;

let registers: Map<string, number> = new Map<string, number>();

function validate(registers: Map<string, number>, condition: string): boolean {
    let parsed = condition.match(conditionRegex);
    if (parsed == null) return false;
    let register = parsed[1];
    let conditional = parsed[2];
    let n: number = parseInt(parsed[3]);

    let r: number | undefined = registers.get(register);
    if (r == undefined) {
        registers.set(register, 0);
        r = 0;
    }
    switch (conditional) {
        case ">": {
            return (r > n);
        }
        case "<": {
            return (r < n);
        }
        case ">=": {
            return (r >= n);
        }
        case "<=": {
            return (r <= n);
        }
        case "==": {
            return (r == n);
        }
        case "!=": {
            return (r != n);
        }
    }

    return false;
}
let max = 0;

lines.forEach((line) => {
    let parsed = line.match(lineRegex);
    if (parsed == null) return;
    let register: string = parsed[1];
    let operator: string = parsed[2];
    let n: number = parseInt(parsed[3]);
    let condition: string = parsed[4];
    if (validate(registers, condition)) {
        switch (operator) {
            case "inc": {
                let r: number | undefined = registers.get(register);
                if (r == undefined) r = 0;
                if ((r + n) > max) max = (r + n)
                registers.set(register, (r += n))
                break;
            }
            case "dec": {
                let r: number | undefined = registers.get(register);
                if (r == undefined) r = 0;
                if ((r - n) > max) max = (r - n)
                registers.set(register, (r -= n))
                break;
            }
        }
    }
});

console.log(registers);
console.log("Max:", max);