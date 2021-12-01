import fs from 'fs';

let f: string = fs.readFileSync("input", "utf-8");
let n: number = parseInt(f.trim());
let side_size: number = 1;
let layer = 0;
for (layer; (side_size * side_size) < n; side_size += 2, layer++);

let half: number = (side_size - 1) / 2;
let side_square: number = (side_size * side_size);
let side_distance: number = (side_square - n) % (side_size - 1);
let distance: number = Math.abs(side_distance - half);

console.log(layer + distance);
