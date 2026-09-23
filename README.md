# 🎯 Number Guessing Game & Word Counter

A Python-based interactive application that combines a randomized Number Guessing Game with a powerful Text Intelligence and Word Frequency Analyzer.

## 🚀 Features

### 🎮 Number Guessing Game
- Random number generation using Python `random` module
- Random target number between 1 and 100
- Higher / Lower hints
- Attempt counter
- Dynamic scoring system
- Input validation
- Success and game completion feedback

### 📝 Word Counter & Text Intelligence
- Read text from files
- Count total words
- Count unique words
- Count characters
- Count lines
- Analyze word frequency
- Display most frequently used words
- Text analysis using Python `Counter`

### 💎 Interactive Web Interface
- Modern premium UI
- Responsive design
- Flask backend
- Interactive JavaScript frontend
- Glassmorphism-inspired design
- Number guessing dashboard
- Word frequency visualization
- Mobile-friendly layout

### 💻 Terminal Support
The project also includes a command-line version of the Number Guessing Game.

## 🛠️ Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Random Module
- Collections `Counter`
- Regular Expressions

## 📁 Project Structure

```text
number-guessing-word-counter/
│
├── analyzer/
│   ├── __init__.py
│   └── word_counter.py
│
├── data/
│   └── sample.txt
│
├── game/
│   ├── __init__.py
│   └── guessing_game.py
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── app.py
├── cli.py
├── requirements.txt
├── .gitignore
└── README.md