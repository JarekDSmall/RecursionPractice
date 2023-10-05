"""Print each square on a new line.

A simple square will only be one line::

    >>> print(dump(0))
    0

    >>> print(dump(1))
    1

A split square will use four lines::

    >>> print(dump([0, 1, 0, 1]))
    0
    1
    0
    1

A nested split square will use one line per square::

    >>> print(dump([0, 0, 0, [1, 1, 1, 1]]))
    0
    0
    0
    1
    1
    1
    1

Of course, these can nested deeply and still work::

    >>> print(dump([0, 0, 0, [1, 1, 1, [0, 0, 0, [1, 1, 1, 1]]]]))
    0
    0
    0
    1
    1
    1
    0
    0
    0
    1
    1
    1
    1
"""


def dump(square):
    """Return a string representation of the square."""
    if isinstance(square, int):
        return str(square)
    else:
    
        return '\n'.join([dump(sub_square) for sub_square in square])

if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print ("\n*** ALL TESTS PASS; NICE JOB!\n")
