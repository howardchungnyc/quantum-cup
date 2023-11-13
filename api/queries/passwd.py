import hashlib


def hashPassword(password: str) -> str:
    """
    Hashes the password using a hash function

    :param password: password to be hashed
    :return: hashed password
    """
    return hashlib.sha512(password.encode()).hexdigest()


def matchPassword(password: str, hashedPassword: str) -> bool:
    """
    Matches the password with the hashed password

    :param password: password to be matched
    :param hashedPassword: hashed password
    :return: True if the password matches, else False
    """
    return hashPassword(password) == hashedPassword
