import math
from utils import read_input, write_output
from functools import reduce

DAY = 1

def calculate_fuel(mass: int) -> int:
    return (math.floor(mass/3) - 2)

def reducer(accumulator: int, element: str) -> int:
    return (accumulator + calculate_fuel(int(element)))

if __name__ == "__main__":
    masses = read_input(DAY)
    total = reduce(reducer, masses, 0)
    write_output(DAY, total)