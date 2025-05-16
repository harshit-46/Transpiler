code = """
# Imports
import math
from os import path

# Constants
PI = 3.1415
E = math.e  # Euler's number

# Unary and Binary Ops
x = 5
y = -x
z = x + y * 2 - (x // 2) % 3 ** 2
w = x & 3 | 2 ^ 1
flag = not (x > 0) and ~x

# Comparisons
a = 10
b = 20
is_equal = a == b
is_not_equal = a != b
is_greater = a > b
is_smaller_or_equal = a <= b

# Inline conditional
status = "OK" if is_equal else "FAIL"

# Function with arguments and return
def power(base, exponent):
    # Calculates power
    return base ** exponent

# Nested function
def outer(val):
    def inner(x):
        return x * x
    return inner(val)

# If-elif-else
if a > b:
    result = "a is greater"
elif a == b:
    result = "a equals b"
else:
    result = "a is smaller"

# While loop
count = 0
while count < 3:
    print(f"count: {count}")
    count += 1
    if count == 2:
        continue
    elif count > 2:
        break

# For loop with range
for i in range(3):
    print(f"For loop iteration {i}")

# List, tuple, dict
nums = [1, 2, 3, 4]
names = ("Alice", "Bob", "Charlie")
mapping = {"x": 1, "y": 2}

# Access and slice
second = nums[1]
sliced = nums[1:3]

# Casting
s = str(a)
i = int("42")
b = bool(1)

# Pass statement
def empty(): pass

# Print section
print(f"x: {x}, y: {y}, z: {z}, w: {w}, flag: {flag}")
print(f"Comparisons: == {is_equal}, != {is_not_equal}")
print(f"Result: {result}, Status: {status}")
print(f"Power: {power(2, 3)}, Outer: {outer(4)}")
print(f"Names: {names}, Mapping: {mapping}")
print(f"Second: {second}, Slice: {sliced}")

"""
