interface Position {
    x: number;
    y: number;
}

function getNeighborsSum(memory: number[][], current_position: Position): number {
    let neighbors: number[] = [
        (memory[current_position.x] === undefined ? 0 : memory[current_position.x][current_position.y + 1]),
        (memory[current_position.x] === undefined ? 0 : memory[current_position.x][current_position.y - 1]),
        (memory[current_position.x + 1] === undefined ? 0 : memory[current_position.x + 1][current_position.y]),
        (memory[current_position.x - 1] === undefined ? 0 : memory[current_position.x - 1][current_position.y]),
        (memory[current_position.x + 1] === undefined ? 0 : memory[current_position.x + 1][current_position.y + 1]),
        (memory[current_position.x + 1] === undefined ? 0 : memory[current_position.x + 1][current_position.y - 1]),
        (memory[current_position.x - 1] === undefined ? 0 : memory[current_position.x - 1][current_position.y + 1]),
        (memory[current_position.x - 1] === undefined ? 0 : memory[current_position.x - 1][current_position.y - 1]),
    ];
    return neighbors.reduce((sum, current) => (current === undefined ? sum + 0 : sum + current), 0);
}

function next_position(current_position: Position, current_direction: string): Position {
    if (current_direction === 'right')
        return { x: 1, y: 0 };
    else if (current_direction === 'up')
        return { x: 0, y: 1 };
    else if (current_direction === 'left')
        return { x: -1, y: 0 };
    else
        return { x: 0, y: -1 };
}

function should_turn(current_position: Position, current_direction: string, memory: number[][]): boolean {
    if (current_direction === 'right')
        return memory[current_position.x][(current_position.y + 1)] === undefined;
    else if (current_direction === 'up')
        return memory[(current_position.x - 1)][current_position.y] === undefined;
    else if (current_direction === 'left')
        return memory[current_position.x][(current_position.y - 1)] === undefined;
    else
        return memory[(current_position.x + 1)][current_position.y] === undefined;
}

let memory: number[][] = [];
memory[0] = [];
memory[0][0] = 1;
let last_number: number = 1;
let n: number = 368078;
let directions = ['right', 'up', 'left', 'down'];
let current_position: Position = { x: 0, y: 0 };
let current_direction = 'right';

while (true) {
    let next = next_position(current_position, current_direction);
    current_position.x += next.x;
    current_position.y += next.y;

    if (memory[current_position.x] === undefined)
        memory[current_position.x] = [];
    last_number = getNeighborsSum(memory, current_position);
    memory[current_position.x][current_position.y] = getNeighborsSum(memory, current_position);

    if (last_number > n)
        break;

    if (should_turn(current_position, current_direction, memory))
        current_direction = directions[(directions.indexOf(current_direction) + 1) % directions.length];
}

console.log(last_number)