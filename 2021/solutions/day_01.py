from typing import Iterable
from advent_util import read_input, write_output
from itertools import tee

DAY = "01"

def part_one(scans: Iterable) -> int:
  a, b = tee(map(lambda x: int(x), scans), 2)
  next(b)
  return sum([1 for x in zip(a, b) if (x[1] > x[0])])
  
def part_two(scans: Iterable) -> int:
  a, b, c = tee(map(lambda x: int(x), scans), 3)
  next(b); next(c); next(c)
  new_list = [sum(x) for x in zip(a,b,c)]
  return part_one(new_list)

if __name__ == "__main__":
  scans = list(read_input(DAY))
  write_output(DAY, 1, part_one(scans))
  write_output(DAY, 2, part_two(scans))