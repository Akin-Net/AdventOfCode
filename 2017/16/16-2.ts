import fs from 'fs';

let programNames: string = "abcdefghijklmnop";
let f: string = fs.readFileSync("input", "utf-8").trim();
// f = "s1,x3/4,pe/b"

let programs: string[] = programNames.split('');
let names: Map<string, number> = new Map<string, number>();
for (let i = 0; i < programs.length; i++) names.set(programs[i], i);

function spin(quantity: number) {
    let q = (quantity % programs.length);
    let s = programs.splice(programs.length - q);
    programs = s.concat(programs);
    for (let p = 0; p < programs.length; p++) names.set(programs[p], p)
}

function exchange(pos1: number, pos2: number) {
    let name1 = programs[pos1];
    let name2 = programs[pos2];
    if (name1 == undefined || name2 == undefined) return;
    names.set(name1, pos2)
    names.set(name2, pos1)
    programs[pos1] = name2;
    programs[pos2] = name1;
}

function partner(name1: string, name2: string) {
    let pos1 = names.get(name1);
    let pos2 = names.get(name2);
    if (pos1 == undefined || pos2 == undefined) return;
    names.set(name1, pos2);
    names.set(name2, pos1);
    programs[pos1] = name2;
    programs[pos2] = name1;
}

let instructions: any[] = []
let input: string[] = f.split(',');
for (let instruction of input) {
    let move: string = instruction[0];
    switch (move) {
        case "s":
            let spinRegex = /s([0-9]+)/i;
            let matchedSpin = instruction.match(spinRegex);
            if (matchedSpin == null) break;
            let times: number = parseInt(matchedSpin[1])
            instructions.push(["spin", times]);
            break;
        case "x":
            let exchangeRegex = /x([0-9]+)\/([0-9]+)/i;
            let matchedExchange = instruction.match(exchangeRegex);
            if (matchedExchange == null) break;
            let exchangePos: number[] = matchedExchange.map((x) => parseInt(x));
            instructions.push(["exchange", exchangePos[1], exchangePos[2]]);
            break;
        case "p":
            instructions.push(["partner", instruction[1], instruction[3]]);
            break;
    }
}

let loopFound = false;
let history: string[] = [];
for (let i = 0; i < 1000000000; i++) {
    for (let instruction of instructions) {
        let f = instruction[0];
        switch (f) {
            case "spin": {
                spin(instruction[1]);
                break;
            }
            case "exchange": {
                exchange(instruction[1], instruction[2]);
                break;
            }
            case "partner": {
                partner(instruction[1], instruction[2]);
                break;
            }
        }
    }
    let hi = history.indexOf(programs.join(''));
    if (hi > -1) {
        console.log("loop found:", hi, i);
        loopFound = true;
    }
    if (loopFound) {
        let window = i - hi;
        let remain = (1000000000 - i) % window;
        console.log(window, remain, history[hi + remain - 1]);
        break;
    }
    history.push(programs.join(''));
    if (i % 1000 == 0) console.log(i);
}