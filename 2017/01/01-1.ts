import fs from 'fs';

let f: String = fs.readFileSync('input.txt', 'utf-8');
// let f: String = "91212129"
let sumArray: Array<number> = [];
for (let i = 0; i < f.length; i++) {
    const element = f[i];
    const next = i === (f.length - 1) ? f[0] : f[i + 1]
    if (element === next) {
        sumArray.push(parseInt(element));
    }
}
let sum = sumArray.reduce((sum, current) => sum + current, 0);

console.log(sum);