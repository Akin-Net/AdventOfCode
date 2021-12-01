import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8").trim();
// f = "flqrgnkx";

// for (let i = 0; i < 128; i++) {
//     let hash = f + "-" + i;
//     let hexHash: string = "";
//     for (let c = 0; c < hash.length; c++) {
//         let hex = hash.charCodeAt(c).toString(16);
//         hexHash += hex;
//     }
//     console.log(hexHash);
// }

function knotHash(f: string): string {
    let lengths: number[] = []
    for (let i = 0; i < f.length; i++) {
        lengths.push(f.charCodeAt(i));
    }
    lengths = lengths.concat([17, 31, 73, 47, 23])

    let size: number = 256;

    let l: number[] = []
    for (let i = 0; i < size; i++) {
        l[i] = i;
    }

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
        let aux = hl[i].toString(16).padStart(2, '0');
        final += aux;
    }

    return final;
}

let count = 0;
for (let i = 0; i < 128; i++) {
    let knot = knotHash(f + "-" + i);
    let final: string = "";
    for (let i = 0; i < knot.length; i++) {
        let aux = parseInt(knot[i], 16).toString(2).padStart(4, '0');
        final += aux;
    }
    count += (final.match(/1/g) || []).length;
}

console.log(count);