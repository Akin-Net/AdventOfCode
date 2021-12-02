from typing import Iterable, Tuple, final
from advent_util import read_input, write_output
from functools import reduce

DAY="02"

def parse_instruction(accumulator: Tuple[int, int], instruction: str) -> Tuple[int, int]:
    match instruction.split():
        case ["forward", x]:
            return tuple(map(sum, zip(accumulator, (int(x), 0))))
        case ["down", x]:
            return tuple(map(sum, zip(accumulator, (0, int(x)))))
        case ["up", x]:
            return tuple(map(sum, zip(accumulator, (0, -int(x)))))

def part_one(instructions: Iterable[str]) -> int:
    final_position = reduce(parse_instruction, instructions, (0,0))
    return final_position[0] * final_position[1]

def parse_instruction_revised(accumulator: Tuple[int, int, int], instruction: str) -> Tuple[int, int, int]:
    match instruction.split():
        case ["forward", x]:
            return tuple(map(sum, zip(accumulator, (int(x), int(x) * accumulator[2], 0))))
        case ["down", x]:
            return tuple(map(sum, zip(accumulator, (0, 0, int(x)))))
        case ["up", x]:
            return tuple(map(sum, zip(accumulator, (0, 0, -int(x)))))

def part_two(instructions: Iterable[str]) -> int:
    final_position = reduce(parse_instruction_revised, instructions, (0,0,0))
    return final_position[0] * final_position[1]

if __name__ == "__main__":
    instructions = list(read_input(DAY))
    write_output(DAY, 1, part_one(instructions))
    write_output(DAY, 2, part_two(instructions))