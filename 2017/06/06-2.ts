import fs from 'fs';

class Bank {
    position: number;
    blocks: number;

    constructor(position: number, blocks: number = 0) {
        this.position = position;
        this.blocks = blocks;
    }
}

class State {
    banks: Bank[];

    constructor(banks: Bank[]) {
        this.banks = banks.map((b) => new Bank(b.position, b.blocks));
    }

    public equals(state: State): boolean {
        if (this.banks.length != state.banks.length)
            return false;
        for (let i = 0; i < state.banks.length; i++) {
            if (this.banks[i].blocks != state.banks[i].blocks)
                return false;
        }
        return true;
    }
}

class Log {
    states: State[];

    constructor() {
        this.states = [];
    }

    public find(state: State): number {
        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i].equals(state))
                return i;
        }
        return -1;
    }
}

let f: string = fs.readFileSync("input", "utf-8");
// let f: string = '0\t2\t7\t0'
let banks: Bank[] = f.split('\t').map((n, i) => new Bank(i, parseInt(n)));

let log: Log = new Log();
let currentState: State;
let nextState: State = new State(banks);

do {
    currentState = new State(nextState.banks);
    log.states.push(currentState);
    let biggestBank: Bank = banks[0];
    for (let i = 0; i < banks.length; i++)
        if (banks[i].blocks > biggestBank.blocks)
            biggestBank = banks[i];

    let distributionBlocks: number = biggestBank.blocks;
    banks[biggestBank.position].blocks = 0;
    for (let remaining = distributionBlocks, currentPosition = (biggestBank.position + 1); remaining > 0; remaining--, currentPosition++) {
        let index: number = currentPosition % banks.length;
        banks[index].blocks++;
    }

    nextState = new State(banks);

} while (log.find(nextState) == -1);

console.log(log.states.length - log.find(nextState));