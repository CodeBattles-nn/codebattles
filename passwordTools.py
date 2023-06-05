import random
import string


def get_random_string(length):
    letters = string.digits + string.ascii_letters
    result_str = ''.join(random.choice(letters) for i in range(length))

    return result_str
