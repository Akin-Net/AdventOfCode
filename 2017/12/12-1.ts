import fs from 'fs';

let f: string = fs.readFileSync('input', 'utf-8').trim();
let lines: string[] = f.split('\n')
let regex = /(?<program>[0-9]+) <-> (?<pipes>[0-9, ]+)/i

let programs: Map<number, number[]> = new Map<number, number[]>();

for (let line of lines) {
    let parsed: RegExpMatchArray | null = line.match(regex);
    if (parsed == null) continue;
    let program: number = parseInt(parsed[1]);
    let pipes: number[] = parsed[2].split(', ').map((x) => parseInt(x));

    programs.set(program, pipes);
}

function findPipes(programs: Map<number, number[]>, program: number, chainPipes: Set<number> = new Set<number>()): Set<number> {
    chainPipes.add(program);
    let pipes: number[] | undefined = programs.get(program);
    if (pipes == undefined) return chainPipes;

    for (let pipe of pipes) {
        if (!chainPipes.has(pipe))
            chainPipes = new Set<number>([...findPipes(programs, pipe, chainPipes), ...chainPipes])
    }
    return chainPipes;
}

let grouped: Map<number, boolean> = new Map<number, boolean>();
let groups: Set<number>[] = [];
for (let program of programs.keys()) {
    if (grouped.get(program) || false) continue;
    let group: Set<number> = findPipes(programs, program);
    for (let groupProgram of group) grouped.set(groupProgram, true);
    groups.push(group);
}
console.log(groups.length);