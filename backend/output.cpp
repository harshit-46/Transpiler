#include <iostream>
#include <string>
#include <cmath>
using namespace std;

// import math
// from os import path
double PI = 3.1415;
int E = math.e;
int x = 5;
int y = (- x);
int z = ((x + (y * 2)) - ((x / 2) % pow(3, 2)));
int w = ((x & 3) | (2 ^ 1));
bool flag = ((! (x > 0)) && (~ x));
int a = 10;
int b = 20;
bool is_equal = (a == b);
bool is_not_equal = (a != b);
bool is_greater = (a > b);
bool is_smaller_or_equal = (a <= b);
string status = (is_equal ? to_string(OK) : "undefined");
void power(int base, int exponent) {
    return (base ** exponent);
}
void outer(int val) {
    void inner(int x) {
        return (x * x);
    }
    return inner(val);
}
if ((a > b)) {
    string result = a is greater;
}
else if ((a == b)) {
    result = a equals b;
}
else {
    result = a is smaller;
}
int count = 0;
while ((count < 3)) {
    cout << "count: " << count << endl;
    count += 1;
    if ((count == 2)) {
        continue;
    }
    else if ((count > 2)) {
        break;
    }
}
for (auto i : range(3)) {
    cout << "For loop iteration " << i << endl;
}
int nums = [1, 2, 3, 4];
int names = (Alice, Bob, Charlie);
int mapping = {x: 1, y: 2};
int second = nums[1];
int sliced = nums[unknown];
string s = str(a);
int i = int(42);
b = bool(1);
void empty() {
    // pass
}
cout << "x: " << x << ", y: " << y << ", z: " << z << ", w: " << w << ", flag: " << flag << endl;
cout << "Comparisons: == " << is_equal << ", != " << is_not_equal << endl;
cout << "Result: " << result << ", Status: " << status << endl;
cout << "Power: " << power(2, 3) << ", Outer: " << outer(4) << endl;
cout << "Names: " << names << ", Mapping: " << mapping << endl;
cout << "Second: " << second << ", Slice: " << sliced << endl;