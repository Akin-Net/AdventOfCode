from collections import defaultdict
from advent_util import read_input, write_output
from typing import Counter, DefaultDict, List, Dict

DAY = "03"

def transpose_count(lines: List[str]) -> List[Dict[str, int]]:
    result = []
    transposed = [''.join(s) for s in zip(*map(lambda x: x.strip(), lines))]
    for line in transposed:
        counter = Counter(line)
        result.append({'0': counter['0'], '1': counter['1']})
    return result

def part_one(lines: List[str]) -> str:
    counter = transpose_count(lines)
    gamma = ""
    epsilon = ""
    print(counter)

    for c in counter:
        gamma += '1' if c['1'] > c['0'] else '0'
        epsilon += '0' if c['1'] > c['0'] else '1'

    return str((int(gamma, 2) * int(epsilon, 2)))

def part_two(lines: List) -> str:
    counter = transpose_count(lines)
    ogr = lines.copy()
    csr = lines.copy()
    length = len(lines[0])

    for i in range(length):
        c = transpose_count(ogr)
        most_common = '1' if c[i]['1'] >= c[i]['0'] else '0'
        ogr = list(filter(lambda x: x[i] == most_common, ogr))
        if len(ogr) < 2: 
            break
    
    for i in range(length):
        c = transpose_count(csr)
        least_common = '0' if c[i]['1'] >= c[i]['0'] else '1'
        csr = list(filter(lambda x: x[i] == least_common, csr))
        if len(csr) < 2:
            break

    return str((int(ogr[0], 2) * int(csr[0], 2)))
        

if __name__ == "__main__":
    lines = list(read_input(DAY))
    write_output(DAY, 1, part_one(lines))
    write_output(DAY, 2, part_two(lines))
