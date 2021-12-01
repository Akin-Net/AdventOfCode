import fs from 'fs';

class Component {
    public constructor(public port1: number, public port2: number) { }

    public strength = (): number => { return (this.port1 + this.port2) }
    public isConnected = (n: number): boolean => { return (this.port1 == n || this.port2 == n) }
}

let bridges: Component[][] = [];
let components: Component[] = []
let f: string = fs.readFileSync('input', 'utf-8').trim();
let lines: string[] = f.split('\n')
for (let line of lines) {
    let portsS: string[] = line.split('/');
    components.push(new Component(parseInt(portsS[0]), parseInt(portsS[1])));
}

let findBridges = (c: Component, from: number, previous: Component[]): Component[][] => {
    // console.log(components.map((x) => x.port1 + '/' + x.port2).join(', '));
    let b: Component[][] = [];
    b.push([c]);
    previous.push(c);
    // console.log(previous.map((x) => x.port1 + '/' + x.port2).join('--'))
    let next: number = (c.port1 == from) ? c.port2 : c.port1;
    for (let component of components) {
        if (component.isConnected(next) && !previous.includes(component)) {
            // console.log("from", from, "next component", component.port1 + "/" + component.port2);
            for (let bridge of findBridges(component, next, [...previous])) {
                // console.log([c, ...bridge].map((x) => x.port1 + '/' + x.port2).join('--'));
                b.push([c, ...bridge])
            }
        }
    }

    return b;
}
let maxStrength: number = 0;
for (let i = 0; i < components.length; i++) {
    if (components[i].isConnected(0)) {
        let b: Component[][] = findBridges(components[i], 0, []);
        for (let bridge of b) {
            // let strength = bridge.reduce((sum, acc) => sum += acc.strength(), 0);
            // maxStrength = (strength > maxStrength) ? strength : maxStrength;
            bridges.push(bridge);
        }
    }
}
// console.log(bridges.map((y) => y.map((x) => x.port1 + '/' + x.port2).join('--')).join('\n'));
let longest = bridges.sort((a, b) => (b.length - a.length) == 0 ?
    (b.reduce((sum, acc) => sum += acc.strength(), 0) - a.reduce((sum, acc) => sum += acc.strength(), 0)) :
    (b.length - a.length))[0];
// console.log(longest.map((y) => y.map((x) => x.port1 + '/' + x.port2).join('--')).join('\n'));
// console.log(longest.map((x) => x.port1 + '/' + x.port2).join('--'));
console.log(longest.reduce((sum, acc) => sum += acc.strength(), 0));

