import random


class NumberGuessingGame:
    """Core engine for the number guessing game."""

    def __init__(self, minimum=1, maximum=100, max_attempts=10):
        self.minimum = minimum
        self.maximum = maximum
        self.max_attempts = max_attempts
        self.reset()

    def reset(self):
        self.secret_number = random.randint(
            self.minimum,
            self.maximum
        )

        self.attempts = 0
        self.game_over = False
        self.won = False
        self.last_hint = "Make your first guess."

    def calculate_score(self):
        if not self.won:
            return 0

        score = (
            self.max_attempts - self.attempts + 1
        ) * 10

        return max(0, min(100, score))

    def make_guess(self, guess):

        if self.game_over:
            return {
                "status": "finished",
                "message": "The game has already ended."
            }

        if not isinstance(guess, int):
            return {
                "status": "error",
                "message": "Please enter a whole number."
            }

        if guess < self.minimum or guess > self.maximum:
            return {
                "status": "error",
                "message": (
                    f"Enter a number between "
                    f"{self.minimum} and {self.maximum}."
                )
            }

        self.attempts += 1

        if guess < self.secret_number:

            self.last_hint = "Too low! Try a higher number."

            status = "low"

        elif guess > self.secret_number:

            self.last_hint = "Too high! Try a lower number."

            status = "high"

        else:

            self.won = True
            self.game_over = True

            self.last_hint = (
                f"Perfect! You found {self.secret_number}!"
            )

            status = "correct"

        if (
            not self.won
            and self.attempts >= self.max_attempts
        ):

            self.game_over = True

            self.last_hint = (
                f"Game over! The number was "
                f"{self.secret_number}."
            )

            status = "game_over"

        return {
            "status": status,
            "message": self.last_hint,
            "attempts": self.attempts,
            "score": self.calculate_score(),
            "game_over": self.game_over,
            "won": self.won
        }

    def get_state(self):

        return {
            "minimum": self.minimum,
            "maximum": self.maximum,
            "max_attempts": self.max_attempts,
            "attempts": self.attempts,
            "score": self.calculate_score(),
            "game_over": self.game_over,
            "won": self.won,
            "hint": self.last_hint
        }