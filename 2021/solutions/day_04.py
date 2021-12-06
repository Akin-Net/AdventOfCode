from typing import List, Tuple
from advent_util import read_input, write_output

DAY = "04"
def parse_input(lines: List[str]) -> Tuple[List[int], List[List[List[int]]]]:
    result = list(map(lambda x: int(x), lines[0].split(',')))
    boards = []
    start = 2
    while start < len(lines)-1:
        board = []
        for i in range(5):
            board.append(list(map(lambda x: int(x), lines[start + i].split())))
        boards.append(board)
        start += 6
    return result, boards

def find_winner(results: List[int], boards: List[List[List[int]]]) -> bool:
    for board in boards:
        for row in board:
            if (all([x in results for x in row])):
                return board
        for column in [x for x in zip(*board)]:
            if (all([x in results for x in column])):
                return board
    return None

def calculate_score(results: List[int], winner: List[List[int]]) -> int:
    unmarked_sum = 0
    for j in winner:
        for k in j:
            if k not in results:
                unmarked_sum += k
    return unmarked_sum * results[-1]

def part_one(lines: List[str]) -> str:
    results, boards = parse_input(lines)
    for i in range(len(results)):
        winner = find_winner(results[:i], boards)
        if winner:
            break
    return str(calculate_score(results[:i], winner))

def part_two(lines: List[str]) -> str:
    results, boards = parse_input(lines)
    last_winner = None
    for i in range(len(results)):
        winner = find_winner(results[:i], boards)
        while winner != None:
            last_winner = winner
            boards.remove(winner)
            winner = find_winner(results[:i], boards)
        if len(boards) < 1:
            break
    return str(calculate_score(results[:i], last_winner))

if __name__ == "__main__":
    lines = list(read_input(DAY))
    write_output(DAY, 1, part_one(lines))
    write_output(DAY, 2, part_two(lines))