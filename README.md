# 🎯 Number Guessing Game & Word Counter

## 1. About the Project

Number Guessing Game & Word Counter is a Python-based project that combines an interactive number guessing game with a file-based word counting and frequency analysis tool.

The Number Guessing Game generates a random number and challenges the user to find it within the minimum number of attempts. The application provides feedback after every guess and keeps track of the number of attempts and score.

The Word Counter analyzes text from a file and provides useful information such as total words, unique words, character count, line count, and word frequency. The project also includes a simple web interface built with Flask for an enhanced user experience.

---

## 2. Features

- 🎯 Random number generation
- 🔢 Interactive number guessing game
- 💡 Higher/Lower hints for every guess
- 🔢 Attempt counter
- 🏆 Score calculation
- 🔄 New game functionality
- 📄 Text file reading
- 🔤 Word counting
- 📊 Word frequency analysis
- 📈 Unique word calculation
- 📝 Character and line count
- 📁 Sample text analysis
- 🛡️ Input validation
- 🖥️ Terminal-based interface
- 🌐 Flask-based web interface

---

## 3. Technologies Used

- Python 3
- Flask
- Random Module
- Collections `Counter`
- Regular Expressions
- File Handling
- HTML5
- CSS3
- JavaScript
- Functions
- Loops
- Conditional Statements
- Exception Handling
- REST API concepts

---

## 4. Project Overview

The project contains two main modules:

### 🎯 Number Guessing Game

The game generates a random number between 1 and 100.

The user enters guesses until the correct number is found.

The application provides hints such as:

    Too low! Try again.

or:

    Too high! Try again.

When the correct number is guessed, the application displays the number of attempts and calculates the score.

Example:

    =============================================
             NUMBER GUESSING GAME
    =============================================

    Guess a number between 1 and 100: 50

    Too high! Try again.

    Guess a number between 1 and 100: 30

    Too low! Try again.

    Guess a number between 1 and 100: 38

    🎉 Correct!

    Attempts: 3
    Score: 80

---

### 📄 Word Counter & Text Analysis

The Word Counter reads text from a file and analyzes its contents.

It calculates:

- Total number of words
- Number of unique words
- Character count
- Number of lines
- Most frequently used words

Example:

    Total Words: 63
    Unique Words: 39
    Characters: 486
    Lines: 8

The application also generates a word-frequency analysis to identify the most commonly occurring words.

---

### 🔤 Word Frequency Analysis

The project uses Python's `Counter` functionality to count how frequently individual words appear in the text.

Example:

    Python       12
    Data          9
    Learning      7
    Technology    5
    Project       4

This helps demonstrate basic text processing and data analysis using Python.

---

### 📁 File-Based Processing

The Word Counter can read text from a file such as:

    data/sample.txt

The text is processed and analyzed without requiring a database.

---

### 🌐 Web Interface

In addition to the terminal functionality, the project includes a Flask-based web interface.

The interface provides separate sections for:

- Number Guessing Game
- Text Intelligence
- Word Frequency Analysis

The Flask application communicates with the backend through API endpoints to process guesses and analyze text.

---

### 🛡️ Input Validation

The project validates user inputs to prevent invalid operations.

It handles:

- Invalid number inputs
- Numbers outside the allowed range
- Empty text input
- Invalid file content
- Invalid requests

This helps make the application more reliable and user-friendly.

---

## 5. How to Run

### Step 1: Clone the Repository

    git clone https://github.com/GANESH2119/number-guessing-word-counter.git

### Step 2: Open the Project Folder

    cd number-guessing-word-counter

### Step 3: Install Required Packages

    pip install -r requirements.txt

### Step 4: Run the Terminal Version

    python cli.py

### Step 5: Run the Web Application

    python app.py

The Flask application will start locally and can be opened in the browser at:

    http://127.0.0.1:5000

---

## 👨‍💻 Developer

**Ganesh Pudi**
