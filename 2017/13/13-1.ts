import fs from 'fs';

class Scanner {
    position: number;
    direction: number;

    public constructor(position: number = 1, direction: number = 1) {
        this.position = position;
        this.direction = direction;
    }
}

class Layer {
    range: number;
    scanner: Scanner;

    public constructor(range: number = 0) {
        this.range = range;
        this.scanner = new Scanner();
    }

    public step() {
        if (this.scanner.position == this.range)
            this.scanner.direction = -1;
        if (this.scanner.position == 1)
            this.scanner.direction = 1;
        this.scanner.position += this.scanner.direction;
    }
}

let filename: string = "input";
let f: string = fs.readFileSync(filename, "utf-8").trim();
let lines: string[] = f.split('\n');

let firewall: Map<number, Layer> = new Map<number, Layer>();
for (let line of lines) {
    let parsed: number[] = line.split(': ').map((x) => parseInt(x));
    firewall.set(parsed[0], new Layer(parsed[1]))
}

let lastLayer = Array.from(firewall.keys()).pop() || 0;

let severity = 0;
for (let packet = 0; packet <= lastLayer; packet++) {
    let layer = firewall.get(packet);

    if (layer != undefined && layer.scanner.position == 1) {
        severity += (packet * layer.range);
    }

    for (let l of firewall.values()) {
        l.step();
    }
}

console.log(severity);