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

function findProgram(programs: Program[], name: string): Program | undefined {
    for (let program of programs)
        if (program.name === name)
            return program;

    return undefined;
}

for (let program of programs) {
    if (program.on == undefined)
        console.log(program.name);
}