import fs from 'fs';

class Program {
    name: string;
    position: number;

    public constructor(name: string, position: number) {
        this.name = name;
        this.position = position;
    }
}

class Group {
    programs: Program[]

    public constructor(programNames: string) {
        this.programs = [];
        for (let i = 0; i < programNames.length; i++) {
            this.programs.push(new Program(programNames[i], i));
        }
    }

    public getPositions(positions: number[]): Program[] {
        return this.programs.filter((program) => positions.includes(program.position));
    }

    public getNames(names: string[]): Program[] {
        return this.programs.filter((program) => names.includes(program.name));
    }

    public spin(times: number) {
        this.programs.map((program) => program.position = (program.position + times) % this.programs.length);
    }

    public exchange(pos1: number, pos2: number) {
        let positions: Program[] = this.getPositions([pos1, pos2]);
        if (positions[0] == undefined || positions[1] == undefined) return;
        let aux: number = positions[0].position
        positions[0].position = positions[1].position;
        positions[1].position = aux;
    }

    public partner(name1: string, name2: string) {
        let positions: Program[] = this.getNames([name1, name2]);
        if (positions[0] == undefined || positions[1] == undefined) return;
        let aux: string = positions[0].name;
        positions[0].name = positions[1].name;
        positions[1].name = aux;
    }

    public toString() {
        return group.programs.sort((a, b) => (a.position - b.position)).map((x) => x.name).join('');
    }
}

let programNames: string = "abcdefghijklmnop";
let f: string = fs.readFileSync("input", "utf-8").trim();

let group: Group = new Group(programNames);
console.log(group.toString());

let instructions: string[] = f.split(',');
for (let instruction of instructions) {
    let move: string = instruction[0];
    switch (move) {
        case "s":
            let spinRegex = /s([0-9]+)/i;
            let matchedSpin = instruction.match(spinRegex);
            if (matchedSpin == null) break;
            let spin: number = parseInt(matchedSpin[1])
            group.spin(spin);
            console.log(instruction, group.toString());
            break;
        case "x":
            let exchangeRegex = /x([0-9]+)\/([0-9]+)/i;
            let matchedExchange = instruction.match(exchangeRegex);
            if (matchedExchange == null) break;
            let exchange: number[] = matchedExchange.map((x) => parseInt(x));
            group.exchange(exchange[1], exchange[2]);
            console.log(instruction, group.toString());
            break;
        case "p":
            group.partner(instruction[1], instruction[3]);
            console.log(instruction, group.toString());
            break;
    }
}

console.log(group.toString());