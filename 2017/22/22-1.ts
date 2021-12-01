class Grid {
    matrix: string[][];
    public constructor(grid: string[][]) {
        this.matrix = grid;
    }

    public expand = () => {
        let newGrid: string[][] = [];
        newGrid.push([]);
        for (let z = 0; z < this.matrix.length + 2; z++) newGrid[0].push('.');
        for (let i = 0; i < this.matrix.length; i++) {
            newGrid.push([]);
            newGrid[(i + 1)].push('.');
            for (let j = 0; j < this.matrix[i].length; j++)
                newGrid[i + 1].push(this.matrix[i][j]);
            newGrid[(i + 1)].push('.');
        }

        newGrid.push([])
        for (let z = 0; z < this.matrix.length + 2; z++) newGrid[this.matrix.length + 1].push('.');
        this.matrix = newGrid;
    }

    public center = (): [number, number] => {
        let centerPoint = Math.floor(this.matrix.length / 2);
        return [centerPoint, centerPoint];
    }

    public toString = () => {
        return this.matrix.map((x) => x.join(' ')).map((y) => " " + y).join(' \n');
    }
}

class Virus {
    public constructor(public direction: number, public position: [number, number], public grid: Grid) { }

    directions = ['l', 'u', 'r', 'd'];

    infections = 0;

    turnLeft = () => { this.direction = ((this.direction - 1) < 0) ? (this.directions.length - 1) : (this.direction - 1) };
    turnRight = () => { this.direction = ((this.direction + 1) > (this.directions.length - 1)) ? 0 : (this.direction + 1) };

    act = () => {
        let cell = this.grid.matrix[this.position[0]][this.position[1]];
        if (cell == '.') {
            this.grid.matrix[this.position[0]][this.position[1]] = 'W';
            this.turnLeft();
        } else if (cell == 'W') {
            this.infections++;
            this.grid.matrix[this.position[0]][this.position[1]] = '#';
        } else if (cell == '#') {
            this.grid.matrix[this.position[0]][this.position[1]] = 'F';
            this.turnRight();
        } else {
            this.grid.matrix[this.position[0]][this.position[1]] = '.';
            this.turnRight();
            this.turnRight();
        }
    }

    step = () => {
        switch (this.directions[this.direction]) {
            case ('u'): {
                this.position[0] -= 1;
                break;
            }
            case ('d'): {
                this.position[0] += 1;
                break;
            }
            case ('l'): {
                this.position[1] -= 1;
                break;
            }
            case ('r'): {
                this.position[1] += 1;
                break;
            }
        }

        if (this.position[0] < 0 || this.position[0] > (this.grid.matrix.length - 1) ||
            this.position[1] < 0 || this.position[1] > (this.grid.matrix.length - 1)) {
            this.grid.expand();
            this.position[0] += 1;
            this.position[1] += 1;
            // console.log(this.toString());
            // console.log(v.position, v.directions[v.direction]);
        }
    }

    toString = () => {
        let x = this.position[0];
        let y = (this.position[1] * 2) + 1;
        let l = this.grid.toString().split('\n');
        let c = l[x].split('');
        c[y - 1] = '[';
        c[y + 1] = ']';
        l[x] = c.join('');
        return l.join('\n');
    }
}

import fs from 'fs';

let filename = 'input';
let f = fs.readFileSync(filename, 'utf-8');
let g = new Grid(f.split('\n').map((x) => x.split('')));
let v = new Virus(1, g.center(), g);

let bursts = 10000000;
for (let s = 0; s < bursts; s++) {
    v.act(); v.step();
    // console.log(v.toString());
    // console.log(v.position, v.directions[v.direction]);
}

console.log(v.infections);