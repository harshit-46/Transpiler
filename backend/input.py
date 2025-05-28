# Function to check if a number is odd or even

def is_odd_or_even(number):
    # Check if the number is even
    if number % 2 == 0:
        return 'Even'
    # If the number is not even, it is odd
    else:
        return 'Odd'