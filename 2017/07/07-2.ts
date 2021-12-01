import fs from 'fs';

class Program {
    name: string;
    weight: number;
    disk: Program[];
    on?: Program;

    public constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
        this.disk = [];
    }

    public equals(program: Program): boolean {
        return this.name === program.name;
    }
}

function findProgram(programs: Program[], name: string): Program | undefined {
    for (let program of programs)
        if (program.name === name)
            return program;

    return undefined;
}

function getWeight(program: Program): number {
    let diskWeight: number = program.disk.reduce((sum, current) => sum + getWeight(current), 0);
    return program.weight + diskWeight;
}

function getBalance(program: Program): number {
    if (program.disk != []) {
        let weights: number[] = [];
        for (let p of program.disk) {
            weights.push(getWeight(p));
        }
        if (weights.length < 2)
            return 0;
        weights.sort();
        if (weights[0] != weights[1])
            return (weights[1] - weights[0]);
        if (weights[weights.length - 1] != weights[weights.length - 2])
            return (weights[weights.length - 2] - weights[weights.length - 1]);
    }
    return 0;
}

function getImbalanced(program: Program): Program {
    program.disk.sort((a, b) => (getWeight(a) > getWeight(b)) ? 1 : ((getWeight(b) > getWeight(a)) ? -1 : 0));
    if (getWeight(program.disk[0]) != getWeight(program.disk[1]))
        return program.disk[0];
    return program.disk[program.disk.length - 1]
}

let f: string = fs.readFileSync("input", "utf-8");
let lines: string[] = f.trim().split('\n')

let programs: Program[] = [];
let relations: Map<string, string[]> = new Map<string, string[]>();

lines.forEach((line) => {
    // console.log(line);
    let branchRegex = /([a-z]+) \(([0-9]+)\) -> (.+)/i;
    let leafRegex = /([a-z]+) \(([0-9]+)\)/i;

    let branch = line.match(branchRegex);
    if (branch != null) {
        programs.push(new Program(branch[1], parseInt(branch[2])));
        relations.set(branch[1], branch[3].split(', '));
    } else {
        let leaf = line.match(leafRegex);
        if (leaf != null)
            programs.push(new Program(leaf[1], parseInt(leaf[2])));
    }
});

relations.forEach((disk, on) => {
    let parent: Program | undefined = findProgram(programs, on);
    if (parent != undefined) {
        for (let childName of disk) {
            let child: Program | undefined = findProgram(programs, childName);
            if (child != undefined) {
                parent.disk.push(child)
                child.on = parent;
            }
        }
    }
})

let root: Program;
for (let program of programs) {
    if (program.on == undefined) {
        root = program;
        let imbalance = getBalance(root);

        console.log(imbalance);

        let imbalanced: boolean = true;
        let current = root;
        while (imbalanced) {
            let foundImbalance = false;
            for (let p of current.disk) {
                if (getBalance(p) != 0) {
                    current = p;
                    foundImbalance = true;
                    break;
                }
            }
            if (foundImbalance == false) {
                let i = getImbalanced(current);
                console.log(i.name);
                console.log(i.weight + imbalance);
                imbalanced = false;
            }
        }
        break;
    }
}

// let imbalance = getBalance(root);

// let imbalanced: boolean = true;
// let current = root;
// while (imbalanced) {
//     for (let p of current.disk) {
//         if (getBalance(p) != 0) {
//             current = p;
//             break;
//         }
//     }
//     if (getBalance(current) == 0) {
//         console.log(current.weight + imbalance);
//         imbalanced = false;
//     }
// }