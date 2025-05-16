#include <iostream>
#include <string>
#include <cmath>
using namespace std;

void is_palindrome(int s) {
    int s = s.replace(" ", "").lower();
    return (s == s[::(-1)]);
}
string input_string = "A man a plan a canal Panama";
cout << is_palindrome(input_string) << endl;