from typing import DefaultDict, Dict, List, Tuple
from advent_util import read_input, write_output
import operator

DAY="05"

def is_direct_vent(vent: Tuple[Tuple[int, int], Tuple[int, int]]) -> bool:
  return (vent[0][0] == vent[1][0] or vent[0][1] == vent[1][1])

def is_direct_or_diagonal_vent(vent: Tuple[Tuple[int, int], Tuple[int, int]]) -> bool:
  t = tuple(map(operator.sub, vent[1], vent[0]))
  return (vent[0][0] == vent[1][0] or vent[0][1] == vent[1][1] or abs(t[0]) == abs(t[1]))

def parse_input(lines: List) -> List[Tuple[Tuple[int, int], Tuple[int, int]]]:
  vents = []
  for line in lines:
    coords1, coords2 = line.strip().split(" -> ")
    point1 = tuple(map(lambda x: int(x), coords1.split(',')))
    point2 = tuple(map(lambda x: int(x), coords2.split(',')))
    vents.append((point1, point2))
  return vents

def get_direction(p1: Tuple[int, int], p2: Tuple[int, int]) -> Tuple[int, int]:
  r = tuple(map(operator.sub, p2, p1))
  if r[1] == 0:
    return (int(r[0]/abs(r[0])), 0)
  if r[0] == 0:
    return (0, int(r[1]/abs(r[1])))
  if r[0] < 0:
    if r[1] < 0:
      return (-1, -1)
    else:
      return (-1, 1)
  else:
    if r[1] < 0:
      return (1, -1)
    else:
      return (1, 1)

def draw_lines(vents: List[Tuple[Tuple[int, int], Tuple[int, int]]]) -> Dict[Tuple[int, int], int]:
  result = DefaultDict(int)
  for vent in vents:
    d = get_direction(*vent)
    point = vent[0]
    while point != vent[1]:
      result[point] += 1
      point = (point[0] + d[0], point[1] + d[1])
    result[point] += 1
  return result

def part_one(lines: List) -> str:
  vents = parse_input(lines)
  direct_vents = filter(is_direct_vent, vents)
  r = draw_lines(direct_vents)
  s = { k: v for (k, v) in r.items() if v > 1 }
  return str(len(s))

def part_two(lines: List) -> str:
  vents = parse_input(lines)
  direct_or_diagonal_vents = filter(is_direct_or_diagonal_vent, vents)
  r = draw_lines(direct_or_diagonal_vents)
  s = { k: v for (k, v) in r.items() if v > 1 }
  return str(len(s))


if __name__ == "__main__":
  lines = list(read_input(DAY))
  write_output(DAY, 1, part_one(lines))
  write_output(DAY, 2, part_two(lines))