from typing import Iterable

def read_input(day: int) -> Iterable[str]:
    filename = f"inputs/day_{day}.txt"
    with open(filename, "r") as f:
        for line in f:
            yield line

def write_output(day: int, output: str) -> None:
    filename = f"outputs/day_{day}.txt"
    with open(filename, "w") as f:
        f.write(str(output))