import fs from 'fs';

class Pattern {
    s: string;

    public constructor(s: string) {
        this.s = s;
    }

    possibleRules = (): string[] => {
        let matrix: string[][] = this.asMatrix();
        return [
            matrix.map((x) => x.join('')).join('/'),
            matrix.map((x) => x.reverse().join('')).join('/'),
            matrix.map((x) => x.join('')).reverse().join('/'),
            matrix.map((x) => x.reverse().join('')).reverse().join('/'),
            matrix[0].map((_, col) => matrix.map(row => row[col]).join('')).join('/'),
            matrix[0].map((_, col) => matrix.map(row => row[col]).join('')).reverse().join('/'),
            matrix[0].map((_, col) => matrix.map(row => row[col]).reverse().join('')).join('/'),
            matrix[0].map((_, col) => matrix.map(row => row[col]).reverse().join('')).reverse().join('/'),
        ]
    }

    transform = (rules: Map<string, string>): void => {
        let possibilities: string[] = this.possibleRules();
        // console.log(possibilities);
        for (let possibility of possibilities) {
            let r = rules.get(possibility)
            if (r != undefined) {
                // console.log(new Pattern(possibilities[0]).toString(), possibilities[0]);
                // console.log('----------------------------');
                // console.log(new Pattern(possibility).toString(), possibility);
                // console.log('----------------------------');
                // console.log(new Pattern(r).toString());
                // console.log('\n\n');
                this.s = r
                return;
            }
        }
    }

    asMatrix = (): string[][] => {
        return this.s.split('/').map((x) => x.split(''));
    }

    toString = (): string => {
        return this.s.split('/').join('\n');
    }
}

class Matrix {
    pattern: Pattern;

    public constructor() {
        this.pattern = new Pattern('.#./..#/###');
    }

    divide = (): Pattern[] => {
        let matrix: string[][] = this.pattern.asMatrix();
        let size = matrix[0].length;
        let patterns: Pattern[] = []
        if ((size % 2) == 0) {
            for (let offsetX = 0; offsetX < (size / 2); offsetX++) {
                for (let offsetY = 0; offsetY < (size / 2); offsetY++) {
                    patterns.push(new Pattern([
                        [matrix[(offsetX * 2) + 0][(offsetY * 2) + 0], matrix[(offsetX * 2) + 0][(offsetY * 2) + 1]].join(''),
                        [matrix[(offsetX * 2) + 1][(offsetY * 2) + 0], matrix[(offsetX * 2) + 1][(offsetY * 2) + 1]].join(''),
                    ].join('/')));
                }
            }
        } else {
            for (let offsetX = 0; offsetX < (size / 3); offsetX++) {
                for (let offsetY = 0; offsetY < (size / 3); offsetY++) {
                    patterns.push(new Pattern([
                        [matrix[(offsetX * 3) + 0][(offsetY * 3) + 0], matrix[(offsetX * 3) + 0][(offsetY * 3) + 1], matrix[(offsetX * 3) + 0][(offsetY * 3) + 2]].join(''),
                        [matrix[(offsetX * 3) + 1][(offsetY * 3) + 0], matrix[(offsetX * 3) + 1][(offsetY * 3) + 1], matrix[(offsetX * 3) + 1][(offsetY * 3) + 2]].join(''),
                        [matrix[(offsetX * 3) + 2][(offsetY * 3) + 0], matrix[(offsetX * 3) + 2][(offsetY * 3) + 1], matrix[(offsetX * 3) + 2][(offsetY * 3) + 2]].join(''),
                    ].join('/')));
                }
            }
        }
        return patterns;
    }

    rejoin = (patterns: Pattern[]): void => {
        let size = Math.sqrt(patterns.length);
        let r: string[] = [];
        let offset: number = 0;
        for (let i = 0; i < patterns.length; i++) {
            let pats = patterns[i].s.split('/')
            if (i != 0 && (i % size) == 0) {
                offset++;
            }
            for (let j = 0; j < pats.length; j++) {
                if (r[j + (offset * pats.length)] == undefined) r[j + (offset * pats.length)] = pats[j];
                else r[j + (offset * pats.length)] += pats[j];
            }
        }
        this.pattern = new Pattern(r.join('/'));
    }
}

let filename: string = 'input';
let f: string = fs.readFileSync(filename, 'utf-8').trim();
let lines: string[] = f.split('\n');

let rules: Map<string, string> = new Map<string, string>();
for (let line of lines) {
    let l = line.split(' => ');
    rules.set(l[0], l[1]);
}

let m = new Matrix();
let interactions = 18;
console.log(m.pattern.toString());
console.log((m.pattern.s.match(/#/g) || []).length);
for (let i = 0; i < interactions; i++) {
    let patterns = m.divide();
    // console.log(patterns.map((x) => x.s));
    for (let pattern of patterns) pattern.transform(rules);
    m.rejoin(patterns);
    console.log(m.pattern.toString());
    console.log((m.pattern.s.match(/#/g) || []).length);
}
// console.log(rules);

