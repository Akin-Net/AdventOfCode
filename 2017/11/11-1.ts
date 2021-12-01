import fs from 'fs';
import { exit } from 'process';

class Child {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public step(direction: string) {
        switch (direction) {
            case "n": {
                this.y += 2;
                break;
            }
            case "s": {
                this.y -= 2;
                break;
            }
            case "ne": {
                this.x += 1;
                this.y += 1;
                break;
            }
            case "se": {
                this.x += 1;
                this.y -= 1;
                break;
            }
            case "nw": {
                this.x -= 1;
                this.y += 1;
                break;
            }
            case "sw": {
                this.x -= 1;
                this.y -= 1;
                break;
            }
            default: {
                console.log("invalid movement");
                exit(0);
            }
        }
    }

    public comeBack(): number {
        let count: number = 0;
        let direction: string;
        while (this.x != 0 || this.y != 0) {
            direction = "";
            if (this.y > 0) direction += "s";
            if (this.y < 0) direction += "n";
            if (this.y == 0) direction += "s";
            if (this.x > 0) direction += "w";
            if (this.x < 0) direction += "e";
            console.log(this.x, this.y, direction);
            this.step(direction);
            count++;
        }
        return count;
    }
}

let f: string = fs.readFileSync("input", "utf-8").trim();
// f = "se,sw,se,sw,sw"

let c: Child = new Child();

let steps: string[] = f.split(',');
for (let i = 0; i < steps.length; i++) {
    c.step(steps[i]);
}

console.log("final position:", c.x, c.y);

let distance: number = c.comeBack();

console.log("result:", distance);
