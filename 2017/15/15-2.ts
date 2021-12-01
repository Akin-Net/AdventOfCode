let a: number = 783;
let b: number = 325;

let aFactor: number = 16807;
let bFactor: number = 48271;

let remainder: number = 2147483647;

let count: number = 0;
for (let i = 0; i < 5000000; i++) {
    do {
        a = (a * aFactor) % remainder;
    } while ((a % 4) != 0);
    do {
        b = (b * bFactor) % remainder;
    } while ((b % 8) != 0);
    let aBin: string = (a).toString(2);
    let bBin: string = (b).toString(2);
    if (aBin.substring(aBin.length - 16, aBin.length) == bBin.substring(bBin.length - 16, bBin.length)) count++;
}

console.log(count);
