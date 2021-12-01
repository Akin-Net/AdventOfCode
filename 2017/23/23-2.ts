let final = 123700;
let start = 106700;
let counter = 0;

let isPrime = (n: number) => {
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++)
        if (n % i === 0) return false;
    return n > 1;
}

for (let i = start; i < final; i += 17) {
    if (!isPrime(i)) {
        counter++;
    }
}
console.log(counter);