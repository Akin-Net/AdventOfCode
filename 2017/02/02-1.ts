import fs from 'fs';

let f: String = fs.readFileSync("input", "utf-8");
let lines: String[] = f.trim().split("\n");
let checksumArray: number[] = [];
lines.forEach(line => {
    let numbers: number[] = line.split("\t").map(number => parseInt(number));
    let min = Math.min.apply(Math, numbers);
    let max = Math.max.apply(Math, numbers);
    checksumArray.push(max - min);
});

let checksum: number = checksumArray.reduce((sum, current) => sum + current, 0);
console.log(checksum);

