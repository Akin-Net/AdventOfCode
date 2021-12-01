from typing import Iterable

def read_input(day: int) -> Iterable[str]:
  """
  Reads input file from inputs folder

  Arguments:
  day -- the day contained in input file with this name format: day_{day}.txt
  """
  filename = f"inputs/day_{day}.txt"
  with open(filename, "r") as f:
    for line in f:
      yield line

def write_output(day: int, part: int, output: str) -> None:
  """
  Writes output to outputs folder

  Arguments:
  day -- the day for the output file
  part -- the part from the daily challenge
  output -- what to write on the file
  """
  filename = f"outputs/day_{day}_part_{part}.txt"
  with open(filename, "w") as f:
    f.write(str(output))