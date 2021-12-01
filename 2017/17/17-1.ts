let steps: number = 367;
// steps = 3;

let buffer: number[] = [0];
let cursor: number = 0;
let size: number = 1;
let insertPosition: number = 0;

for (let i = 1; i < 2018; i++) {
    cursor = (cursor + steps) % size;
    insertPosition = (cursor + 1) % size;
    buffer.splice(insertPosition, 0, i);
    size++;
    cursor = insertPosition;
}
console.log(buffer[(insertPosition + 1) % size]);