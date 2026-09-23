from flask import Flask, render_template, request, jsonify
import random
import re
from collections import Counter
from pathlib import Path


# =========================================================
# NEXUS — Flask Application
# Number Guessing Game + Word Intelligence
# =========================================================

app = Flask(__name__)


# =========================================================
# GAME STATE
# =========================================================

current_target = None
current_attempts = 0


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# START NEW GAME
# =========================================================

@app.route("/api/game/new", methods=["GET"])
def new_game():

    global current_target
    global current_attempts

    current_target = random.randint(1, 100)
    current_attempts = 0

    return jsonify({
        "success": True,
        "target": current_target,
        "attempts": current_attempts
    })


# =========================================================
# GUESS NUMBER
# =========================================================

@app.route("/api/game/guess", methods=["POST"])
def guess_number():

    global current_target
    global current_attempts

    if current_target is None:
        return jsonify({
            "error": "No active game. Start a new game."
        }), 400

    data = request.get_json(silent=True)

    if not data or "guess" not in data:
        return jsonify({
            "error": "Please provide a guess."
        }), 400

    try:
        guess = int(data["guess"])
    except (ValueError, TypeError):

        return jsonify({
            "error": "Guess must be an integer."
        }), 400

    if guess < 1 or guess > 100:

        return jsonify({
            "error": "Guess must be between 1 and 100."
        }), 400

    current_attempts += 1

    # Correct
    if guess == current_target:

        target = current_target
        attempts = current_attempts

        return jsonify({
            "success": True,
            "result": "correct",
            "target": target,
            "attempts": attempts
        })

    # Too low
    if guess < current_target:

        return jsonify({
            "success": True,
            "result": "low",
            "attempts": current_attempts
        })

    # Too high
    return jsonify({
        "success": True,
        "result": "high",
        "attempts": current_attempts
    })


# =========================================================
# TEXT ANALYSIS
# =========================================================

@app.route("/api/analyze", methods=["POST"])
def analyze_text():

    data = request.get_json(silent=True)

    if not data or "text" not in data:

        return jsonify({
            "error": "No text provided."
        }), 400

    text = str(data["text"])

    if not text.strip():

        return jsonify({
            "error": "Text cannot be empty."
        }), 400

    # Extract words
    words = re.findall(
        r"\b[a-zA-Z0-9']+\b",
        text.lower()
    )

    counter = Counter(words)

    total_words = len(words)
    unique_words = len(counter)
    characters = len(text)

    lines = len(
        text.splitlines()
    )

    # Top 15 words
    frequency = [
        [word, count]
        for word, count
        in counter.most_common(15)
    ]

    return jsonify({

        "success": True,

        "total_words": total_words,

        "unique_words": unique_words,

        "characters": characters,

        "lines": lines,

        "frequency": frequency

    })


# =========================================================
# SAMPLE TEXT
# =========================================================

@app.route("/api/sample", methods=["GET"])
def sample_text():

    sample_path = (
        Path(__file__).parent
        / "data"
        / "sample.txt"
    )

    try:

        if sample_path.exists():

            text = sample_path.read_text(
                encoding="utf-8"
            )

        else:

            text = """
            Python is a powerful programming language.
            Python is widely used for data science.
            Data science uses Python for analysis.
            Machine learning and artificial intelligence
            often use Python for building intelligent systems.
            """

    except Exception:

        text = """
        Python is a powerful programming language.
        Python is widely used for data science.
        Data science uses Python for analysis.
        Machine learning and artificial intelligence
        often use Python for building intelligent systems.
        """

    return jsonify({
        "success": True,
        "text": text
    })


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "status": "online",
        "application": "NEXUS Intelligence Suite"
    })


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({
        "error": "Endpoint not found."
    }), 404


@app.errorhandler(500)
def internal_server_error(error):

    return jsonify({
        "error": "Internal server error."
    }), 500


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )