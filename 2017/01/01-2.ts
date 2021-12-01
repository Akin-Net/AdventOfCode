import fs from 'fs';

let f: String = fs.readFileSync('input.txt', 'utf-8');
let sumArray: Array<number> = [];
for (let i = 0; i < f.length; i++) {
    const element = f[i];
    const halfway = f[(i + (f.length / 2)) % f.length];
    console.log(element, halfway);
    if (element === halfway) {
        sumArray.push(parseInt(element));
    }
}
let sum = sumArray.reduce((sum, current) => sum + current, 0);

console.log(sum);