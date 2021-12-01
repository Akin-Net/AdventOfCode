import fs from 'fs';

let file: string = fs.readFileSync('input', 'utf-8');
let lines = file.split('\n');
let entrance: [number, number];
let running: boolean = true;
let letters: string[] = [];
let direction: string = 'd';

for (let i = 0; i < lines[0].length; i++) {
    if (lines[0][i] === '|') { entrance = [0, i]; break; };
}

let current: [number, number] = entrance!;
let steps = 0;

function step(current: [number, number], direction: string): [number, number] {
    switch (direction) {
        case 'u':
            return [current[0] - 1, current[1]];
        case 'd':
            return [current[0] + 1, current[1]];
        case 'l':
            return [current[0], current[1] - 1];
        case 'r':
            return [current[0], current[1] + 1];
        default:
            return [0, 0];
    }
}

function evaluate(current: [number, number]) {
    let x = current[0];
    let y = current[1];
    let symbol: string = lines[x][y];
    if ('|-+ '.indexOf(symbol) === -1) letters.push(symbol);
    if (symbol === '+') {
        switch (direction) {
            case 'u':
            case 'd': {
                if (lines[x][y - 1] != ' ')
                    direction = 'l';
                else if (lines[x][y + 1] != ' ')
                    direction = 'r'
                else
                    running = false;
                break;
            }
            case 'l':
            case 'r': {
                if (lines[x - 1][y] !== ' ')
                    direction = 'u';
                else if (lines[x + 1][y] !== ' ')
                    direction = 'd'
                else
                    running = false;
                break;
            }
        }
    }
    if (symbol == ' ') running = false;
}

while (running) {
    steps++;
    current = step(current, direction);
    console.log(current, lines[current[0]][current[1]]);
    evaluate(current);
};

console.log(letters.join(''));
console.log(steps);