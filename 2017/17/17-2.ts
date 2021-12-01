class Position {
    value: number;
    next: Position;

    public constructor(value: number) {
        this.value = value;
        this.next = this;
    }

    public insert(value: number) {
        let p = new Position(value);
        p.next = this.next;
        this.next = p;
    }
}

class SpinBuffer {
    root: Position;

    public constructor() {
        this.root = new Position(0);
    }
}

let steps: number = 367;
// steps = 3;

let buffer: SpinBuffer = new SpinBuffer();
let cursor: Position = buffer.root;

for (let i = 1; i < 50000000; i++) {
    for (let j = 0; j < steps; j++) cursor = cursor.next!;
    cursor.insert(i)
    cursor = cursor.next;
    // if (i % 100000 == 0) console.log(i);
}

console.log(cursor.next)
console.log(buffer.root.next!)

// for (let i = 0; i < size; i++) if (buffer[i] == 0) console.log(buffer[(i + 1) % size])
// console.log(buffer[(insertPosition + 1) % size]);