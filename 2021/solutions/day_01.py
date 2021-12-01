from typing import Iterable
from advent_util import read_input, write_output

DAY = "01"

def part_one(scans: Iterable) -> int:
  last = 0
  count = 0
  for s in scans:
    if int(s) > int(last):
      count += 1
    last = s
  return count - 1

def part_two(scans: Iterable) -> int:
  new_l = []
  for i, s in enumerate(scans):
    new_l.append(int(s))
    if i > 0:
      new_l[i - 1] += int(s)
    if i > 1:
      new_l[i - 2] += int(s)
  return part_one(new_l)

if __name__ == "__main__":
  scans_one = read_input(DAY)
  total_one = part_one(scans_one)
  write_output(DAY, 1, total_one)
  scans_two = read_input(DAY)
  total_two = part_two(scans_two)
  write_output(DAY, 2, total_two)