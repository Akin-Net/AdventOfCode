import fs from 'fs';

function getChecksumElement(numbers: number[]): number {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (((numbers[i] > numbers[j]) && (numbers[i] % numbers[j] === 0)))
                return (numbers[i] / numbers[j]);
        }
    }
    return 0;
}

let f: String = fs.readFileSync("input", "utf-8");
let lines: String[] = f.trim().split("\n");
let checksumArray: number[] = [];
lines.forEach(line => {
    let numbers: number[] = line.split("\t").map(number => parseInt(number));
    let checksumElement: number = getChecksumElement(numbers)
    // console.log(checksumElement);
    checksumArray.push(checksumElement);
});

let checksum: number = checksumArray.reduce((sum, current) => sum + current, 0);
console.log(checksum);
