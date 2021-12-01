import fs from 'fs';

class Particle {
    position: [number, number, number];
    velocity: [number, number, number];
    acceleration: [number, number, number];

    public constructor(line: string) {
        let regex = /p=<([-0-9]+),([-0-9]+),([-0-9]+)>, v=<([-0-9]+),([-0-9]+),([-0-9]+)>, a=<([-0-9]+),([-0-9]+),([-0-9]+)>/i
        let args = line.match(regex);
        if (args == undefined) {
            this.position = [0, 0, 0];
            this.velocity = [0, 0, 0];
            this.acceleration = [0, 0, 0];
        } else {
            this.position = [parseInt(args[1]), parseInt(args[2]), parseInt(args[3])];
            this.velocity = [parseInt(args[4]), parseInt(args[5]), parseInt(args[6])];
            this.acceleration = [parseInt(args[7]), parseInt(args[8]), parseInt(args[9])];
        }
    }

    calculatePositionInTime = (t: number): [number, number, number] => {
        let s: [number, number, number] = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            let x = this.position[i] + (this.velocity[i] * t) + (this.acceleration[i] * t * t / 2);
            s[i] += x;
        }
        return s;
    }
}

let f = fs.readFileSync('input', 'utf-8').trim();
let lines = f.split('\n');
let time = 100;
let closest;
let minDistance;

let d: number[] = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let p = new Particle(line);
    let position = p.calculatePositionInTime(time);
    let distance = position.reduce((sum, acc) => sum += Math.abs(acc), 0);
    if (minDistance === undefined || minDistance > distance) {
        console.log(minDistance, distance);
        minDistance = distance;
        closest = i;
    }
}
console.log(closest);