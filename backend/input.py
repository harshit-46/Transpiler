code = """
import math
from sys import version as py_version

x = 5
y = 10
z = x + y * 2

def greet(name):
    print("Hello", name)
    if name == "Alice":
        print("Welcome back!")
    elif name == "Bob":
        print("Hi Bob!")
    else:
        print("Stranger danger!")

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        print(self.name, "says hi.")

    def is_adult(self):
        if self.age >= 18:
            return True
        else:
            return False

items = [1, 2, 3, 4]
coords = (10, 20)
data = {"a": 1, "b": 2}

for item in items:
    if item % 2 == 0:
        continue
    else:
        print(item)

i = 0
while i < 5:
    if i == 3:
        break
    i += 1

val = not x
bitwise = ~y
shift = x << 2
logical = (x < y and y != 0) or (x > 1)
greet("Bob")

person = Person("Alice", 30)
person.speak()

pass
"""
