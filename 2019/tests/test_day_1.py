import pytest
from solutions.day_1 import calculate_fuel, calculate_fuel_fuel

@pytest.mark.parametrize(
    "input, expected_result",
    [
        (12, 2),
        (14, 2),
        (1969, 654),
        (100756, 33583),
    ]
)
def test_one(input, expected_result):
    assert calculate_fuel(input) == expected_result

@pytest.mark.parametrize(
    "input, expected_result",
    [
        (1969, 966),
        (100756, 50346)
    ]
)
def test_two(input, expected_result):
    assert calculate_fuel_fuel(input) == expected_result