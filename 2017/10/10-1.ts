import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8");
// f = "3,4,1,5"
let size: number = 256;

let l: number[] = []
for (let i = 0; i < size; i++) {
    l[i] = i;
}

let lengths: number[] = f.split(',').map((x) => parseInt(x));
let position: number = 0;
for (let i = 0, skip = 0; i < lengths.length; i++, skip++) {
    let length: number = lengths[i];
    let invert: number = Math.floor(length / 2);
    for (let j = 0; j < invert; j++) {
        let first: number = ((position + j) % size);
        let second: number = ((position + length - j - 1) % size);
        let aux: number = l[first];
        l[first] = l[second];
        l[second] = aux;
    }
    position = (position + length + skip) % l.length;
}

console.log(l[0] * l[1]);