def is_palindrome(s):
    # Remove spaces and convert to lowercase
    s = s.replace(' ', '').lower()
    # Check if the string is equal to its reverse
    return s == s[::-1]

# Example usage
input_string = 'A man a plan a canal Panama'
print(is_palindrome(input_string))