import re
from collections import Counter


def analyze_text(text):
    """Analyze text and return word statistics."""

    words = re.findall(
        r"\b[a-zA-Z0-9']+\b",
        text.lower()
    )

    frequency = Counter(words)

    return {
        "total_words": len(words),
        "unique_words": len(frequency),
        "characters": len(text),
        "lines": len(text.splitlines()),
        "frequency": frequency.most_common(15)
    }


def analyze_file(filename):
    """Read a text file and analyze its contents."""

    with open(
        filename,
        "r",
        encoding="utf-8"
    ) as file:

        text = file.read()

    return analyze_text(text)