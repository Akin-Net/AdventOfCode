import math
from utils import read_input, write_output
from functools import reduce, partial
from typing import Callable, Iterable

DAY = 1

def calculate_fuel(mass: int) -> int:
    return (math.floor(mass/3) - 2)

def reducer(func: Callable[[int], int], accumulator: int, element: str) -> int:
    return (accumulator + func(int(element)))

def part_one(masses: Iterable) -> int:
    partial_reducer = partial(reducer, calculate_fuel)
    return reduce(partial_reducer, masses, 0)

def part_two(masses: Iterable) -> int:
    partial_reducer = partial(reducer, calculate_fuel_fuel)
    return reduce(partial_reducer, masses, 0)

def calculate_fuel_fuel(mass: int) -> int:
    result = (math.floor(mass/3) - 2)
    return result + calculate_fuel_fuel(result) if result > 0 else 0

if __name__ == "__main__":
    masses = read_input(DAY)
    total = part_two(masses)
    write_output(DAY, total)