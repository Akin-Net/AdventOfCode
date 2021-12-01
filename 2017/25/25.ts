class Rule {
    public constructor(public write: number, public move: string, public state: string) { }
}

class TuringMachine {
    cursor: number;
    min: number;
    max: number;
    tape: number[];
    state: string;

    public constructor(initialState: string,
        public checksumSteps: number,
        public states: Map<string, [Rule, Rule]>) {
        this.state = initialState;
        this.cursor = 0;
        this.min = 0;
        this.max = 0;
        this.tape = [];
    }

    public step = () => {
        let current = this.tape[this.cursor] || 0;
        let rule = this.states.get(this.state)![current];
        this.tape[this.cursor] = rule.write;
        if (rule.move == 'right') this.cursor++;
        else this.cursor--;
        if (this.cursor > this.max) this.max = this.cursor;
        if (this.cursor < this.min) this.min = this.cursor;
        this.state = rule.state;
    }

    public checksum = () => {
        let c = 0;
        for (let i = this.min; i <= this.max; i++) {
            c += this.tape[i];
        }
        return c;
    }
}

import fs from 'fs';

let f = fs.readFileSync('input', 'utf-8');
let lines = f.split('\n');

let initialState = lines[0].match(/Begin in state ([A-Z]+)\./i)![1];
let checkSumSteps = lines[1].match(/Perform a diagnostic checksum after ([0-9]+) steps./i)![1];
let states: Map<string, [Rule, Rule]> = new Map<string, [Rule, Rule]>();

for (let i = 3; i < lines.length; i += 10) {
    let state = lines[i].match(/In state ([A-Z]+):/i)![1];
    let value0 = lines[i + 2].match(/Write the value ([0-9]+)./i)![1];
    let move0 = lines[i + 3].match(/Move one slot to the ([a-z]+)./i)![1];
    let state0 = lines[i + 4].match(/Continue with state ([A-Z]+)./i)![1];
    let value1 = lines[i + 6].match(/Write the value ([0-9]+)./i)![1];
    let move1 = lines[i + 7].match(/Move one slot to the ([a-z]+)./i)![1];
    let state1 = lines[i + 8].match(/Continue with state ([A-Z]+)./i)![1];

    states.set(state, [new Rule(parseInt(value0), move0, state0), new Rule(parseInt(value1), move1, state1)]);
}

let t = new TuringMachine(initialState, parseInt(checkSumSteps), states);

for (let i = 0; i < t.checksumSteps; i++) {
    t.step();
}

console.log(t.checksum());