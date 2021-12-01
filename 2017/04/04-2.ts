import fs from 'fs';

function isValid(passphrase: string): boolean {
    let passwords: string[] = passphrase.split(' ');
    let usedPasswords: Map<string, boolean> = new Map<string, boolean>();
    for (let i = 0; i < passwords.length; i++) {
        let password: string = passwords[i];
        password = password.split('').sort().join('');
        if (usedPasswords.get(password))
            return false;
        usedPasswords.set(password, true);
    }
    return true;
}

let f: string = fs.readFileSync("input", "utf-8");
let lines: string[] = f.trim().split('\n');
let validSum: number = 0;
lines.forEach(line => {
    if (isValid(line))
        validSum++;
});

console.log(validSum);