import pytest
from solutions.day_1 import calculate_fuel

@pytest.mark.parametrize(
    "input, expected_result",
    [
        (12, 2),
        (14, 2),
        (1969, 654),
        (100756, 33583),
    ]
)
def test(input, expected_result):
    assert calculate_fuel(input) == expected_result