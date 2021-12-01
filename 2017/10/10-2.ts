import fs from 'fs';
import { exit } from 'process';

let f: string = fs.readFileSync("input", "utf-8").trim();
// f = "1,2,3";

let prefix = []
for (let i = 0; i < f.length; i++) {
    prefix.push(f.charCodeAt(i));
}

// prefix = [3, 4, 1, 5];
let suffix = [17, 31, 73, 47, 23]

let size: number = 256;

let l: number[] = []
for (let i = 0; i < size; i++) {
    l[i] = i;
}

let lengths: number[] = prefix.concat(suffix);
let position: number = 0;
let skip: number = 0;
for (let round = 0; round < 64; round++) {
    for (let i = 0; i < lengths.length; i++) {
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
        skip++;
    }
}

let hl: number[] = [];
for (let i = 0; i < 16; i++) {
    let start: number = 16 * i;
    let s = l.slice(start, start + 16);
    let xor = s.reduce((x, current) => x ^= current, 0);
    hl.push(xor);
}

let final: string = "";
for (let i = 0; i < hl.length; i++) {
    let aux = hl[i].toString(16);
    if (aux.length < 2) aux = "0" + aux;
    final += aux;
}

console.log(final);