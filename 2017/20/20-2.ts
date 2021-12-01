import fs from 'fs';

class Particle {
    position: [number, number, number];
    velocity: [number, number, number];
    acceleration: [number, number, number];
    destroyed: boolean;

    public constructor(line: string) {
        this.destroyed = false;
        let regex = /p=<\s?([-0-9]+),([-0-9]+),([-0-9]+)>, v=<\s?([-0-9]+),([-0-9]+),([-0-9]+)>, a=<\s?([-0-9]+),([-0-9]+),([-0-9]+)>/i
        let args = line.match(regex);
        if (args == undefined) {
            console.log("asddd");
            this.position = [0, 0, 0];
            this.velocity = [0, 0, 0];
            this.acceleration = [0, 0, 0];
        } else {
            this.position = [parseInt(args[1]), parseInt(args[2]), parseInt(args[3])];
            this.velocity = [parseInt(args[4]), parseInt(args[5]), parseInt(args[6])];
            this.acceleration = [parseInt(args[7]), parseInt(args[8]), parseInt(args[9])];
        }
    }

    destroy = () => this.destroyed = true;

    equals = (p: Particle) => {
        return (this.position[0] === p.position[0] && this.position[1] === p.position[1] && this.position[2] === p.position[2]);
    }

    step = () => {
        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];
        this.velocity[2] += this.acceleration[2];

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[2] += this.velocity[2];
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
let time = 10000;
let particles: Particle[] = [];
// console.log(lines);
for (let line of lines) particles.push(new Particle(line));

// console.log(particles);

for (let i = 0; i < time; i++) {
    let ndp = particles.filter((x) => !x.destroyed);
    console.log(ndp.length);
    let distances: Map<string, Particle[]> = new Map<string, Particle[]>();
    let count = 0;
    for (let p of ndp) {
        let pp: string = p.position.join();
        // console.log(pp);
        if (distances.get(pp) == undefined) {
            count++;
            distances.set(pp, []);
        }
        distances.get(pp)!.push(p);
        // console.log(distances.get(pp)!.length);
    }
    // console.log(ndp.length, count);
    for (let d of distances.values()) {
        if (d.length > 1) {
            console.log(d.map((x) => x.position));
            d.map((x) => x.destroy());
        }
    }
    for (let p of ndp) p.step();
}

console.log(particles.filter((x) => !x.destroyed).length)

