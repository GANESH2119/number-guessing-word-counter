/* =========================================================
   NEXUS — Frontend Controller
   Number Guessing Game + Text Intelligence
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const guessInput = document.getElementById("guessInput");
    const guessButton = document.getElementById("guessButton");
    const resetButton = document.getElementById("resetButton");

    const gameMessage = document.getElementById("gameMessage");
    const attemptsElement = document.getElementById("attempts");
    const scoreElement = document.getElementById("score");

    const textInput = document.getElementById("textInput");
    const analyzeButton = document.getElementById("analyzeButton");
    const sampleButton = document.getElementById("sampleButton");

    const totalWordsElement =
        document.getElementById("totalWords");

    const uniqueWordsElement =
        document.getElementById("uniqueWords");

    const charactersElement =
        document.getElementById("characters");

    const linesElement =
        document.getElementById("lines");

    const frequencyList =
        document.getElementById("frequencyList");

    const frequencyCount =
        document.getElementById("frequencyCount");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       GAME STATE
       ===================================================== */

    let targetNumber = null;
    let attempts = 0;
    let score = 0;
    let gameOver = false;


    /* =====================================================
       UTILITY
       ===================================================== */

    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    function setGameMessage(message, type = "") {

        gameMessage.textContent = message;

        gameMessage.className =
            "game-message";

        if (type) {
            gameMessage.classList.add(type);
        }
    }


    /* =====================================================
       START NEW GAME
       ===================================================== */

    async function startNewGame() {

        try {

            const response =
                await fetch("/api/game/new");

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Unable to start a new game."
                );
            }

            targetNumber = data.target;

            attempts = 0;
            score = 100;
            gameOver = false;

            attemptsElement.textContent =
                attempts;

            scoreElement.textContent =
                score;

            guessInput.value = "";

            guessInput.disabled = false;

            guessButton.disabled = false;

            setGameMessage(
                "New challenge generated. Make your first guess."
            );

            showToast(
                "New number challenge ready!"
            );

        } catch (error) {

            console.error(error);

            setGameMessage(
                "Unable to connect to the game engine.",
                "error"
            );

            showToast(
                "Game server connection failed."
            );
        }
    }


    /* =====================================================
       SUBMIT GUESS
       ===================================================== */

    async function submitGuess() {

        if (gameOver) {
            showToast(
                "Start a new game first."
            );

            return;
        }


        const value =
            guessInput.value.trim();


        if (!value) {

            setGameMessage(
                "Please enter a number between 1 and 100.",
                "error"
            );

            guessInput.focus();

            return;
        }


        const guess =
            Number(value);


        if (
            !Number.isInteger(guess) ||
            guess < 1 ||
            guess > 100
        ) {

            setGameMessage(
                "Invalid input. Enter an integer from 1 to 100.",
                "error"
            );

            guessInput.focus();

            return;
        }


        try {

            const response =
                await fetch("/api/game/guess", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        guess: guess
                    })
                });


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Guess request failed."
                );
            }


            attempts =
                data.attempts;


            score =
                Math.max(
                    0,
                    100 - ((attempts - 1) * 10)
                );


            attemptsElement.textContent =
                attempts;


            scoreElement.textContent =
                score;


            /* =============================================
               CORRECT
               ============================================= */

            if (data.result === "correct") {

                gameOver = true;

                setGameMessage(
                    `🎉 Excellent! You found ${data.target}. ` +
                    `Completed in ${attempts} attempt` +
                    `${attempts === 1 ? "" : "s"}!`,
                    "success"
                );


                guessInput.disabled = true;

                guessButton.disabled = true;


                score =
                    Math.max(
                        0,
                        100 - ((attempts - 1) * 10)
                    );


                scoreElement.textContent =
                    score;


                showToast(
                    `Challenge completed! Score: ${score}`
                );

                return;
            }


            /* =============================================
               HIGH
               ============================================= */

            if (data.result === "high") {

                setGameMessage(
                    "📉 Too high! Try a smaller number.",
                    "error"
                );

            }


            /* =============================================
               LOW
               ============================================= */

            else if (data.result === "low") {

                setGameMessage(
                    "📈 Too low! Try a larger number."
                );

            }


            guessInput.select();


        } catch (error) {

            console.error(error);

            setGameMessage(
                error.message ||
                "Something went wrong.",
                "error"
            );

            showToast(
                "Unable to process your guess."
            );
        }
    }


    /* =====================================================
       TEXT ANALYSIS
       ===================================================== */

    async function analyzeText() {

        const text =
            textInput.value.trim();


        if (!text) {

            showToast(
                "Enter some text to analyze."
            );

            textInput.focus();

            return;
        }


        try {

            analyzeButton.disabled = true;

            analyzeButton.innerHTML =
                "ANALYZING...";


            const response =
                await fetch(
                    "/api/analyze",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            text: text
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Text analysis failed."
                );
            }


            /* =============================================
               STATISTICS
               ============================================= */

            totalWordsElement.textContent =
                data.total_words ?? 0;


            uniqueWordsElement.textContent =
                data.unique_words ?? 0;


            charactersElement.textContent =
                data.characters ?? text.length;


            linesElement.textContent =
                data.lines ??
                text.split("\n").length;


            /* =============================================
               FREQUENCY
               ============================================= */

            renderFrequency(
                data.frequency ||
                data.word_frequency ||
                []
            );


            showToast(
                "Text analysis completed!"
            );


        } catch (error) {

            console.error(error);

            showToast(
                error.message ||
                "Analysis failed."
            );


        } finally {

            analyzeButton.disabled =
                false;

            analyzeButton.innerHTML =
                "ANALYZE TEXT →";
        }
    }


    /* =====================================================
       RENDER FREQUENCY
       ===================================================== */

    function renderFrequency(frequency) {

        frequencyList.innerHTML = "";


        if (
            !frequency ||
            frequency.length === 0
        ) {

            frequencyList.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        ◌
                    </div>

                    <h4>
                        No words found
                    </h4>

                    <p>
                        Try entering a longer piece of text.
                    </p>

                </div>
            `;

            frequencyCount.textContent =
                "NO RESULTS";

            return;
        }


        /*
         * Supports both:
         *
         * [
         *   ["python", 5],
         *   ["data", 3]
         * ]
         *
         * and:
         *
         * [
         *   {word: "python", count: 5}
         * ]
         */


        let normalized = frequency.map(item => {

            if (Array.isArray(item)) {

                return {
                    word: item[0],
                    count: Number(item[1])
                };
            }


            return {
                word:
                    item.word ||
                    item.text ||
                    "",

                count:
                    Number(
                        item.count ||
                        item.frequency ||
                        0
                    )
            };

        });


        normalized =
            normalized
                .filter(item =>
                    item.word
                )
                .sort(
                    (a, b) =>
                        b.count - a.count
                )
                .slice(0, 15);


        if (normalized.length === 0) {

            frequencyCount.textContent =
                "NO RESULTS";

            return;
        }


        const maxCount =
            Math.max(
                ...normalized.map(
                    item => item.count
                )
            );


        frequencyCount.textContent =
            `TOP ${normalized.length} WORDS`;


        normalized.forEach(
            (item, index) => {

                const percentage =
                    (item.count / maxCount) * 100;


                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "frequency-item";


                row.style.animationDelay =
                    `${index * 50}ms`;


                row.innerHTML = `

                    <div
                        class="frequency-word"
                        title="${escapeHtml(item.word)}"
                    >
                        ${escapeHtml(item.word)}
                    </div>

                    <div class="frequency-track">

                        <div
                            class="frequency-fill"
                            style="width: ${percentage}%"
                        ></div>

                    </div>

                    <div class="frequency-value">
                        ${item.count}
                    </div>

                `;


                frequencyList.appendChild(row);

            }
        );
    }


    /* =====================================================
       HTML ESCAPE
       ===================================================== */

    function escapeHtml(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* =====================================================
       LOAD SAMPLE TEXT
       ===================================================== */

    async function loadSample() {

        try {

            const response =
                await fetch(
                    "/api/sample"
                );


            if (response.ok) {

                const data =
                    await response.json();


                textInput.value =
                    data.text || "";

            } else {

                textInput.value =
                    `Python is a powerful programming language.
Python is widely used for data science.
Data science uses Python for analysis.
Machine learning and artificial intelligence
often use Python for building intelligent systems.`;

            }


            updateLiveStats();

            showToast(
                "Sample text loaded."
            );


        } catch (error) {

            console.error(error);


            textInput.value =
                `Python is a powerful programming language.
Python is widely used for data science.
Data science uses Python for analysis.
Machine learning and artificial intelligence
often use Python for building intelligent systems.`;


            updateLiveStats();

        }
    }


    /* =====================================================
       LIVE TEXT STATISTICS
       ===================================================== */

    function updateLiveStats() {

        const text =
            textInput.value;


        const trimmed =
            text.trim();


        const words =
            trimmed
                ? trimmed.split(/\s+/)
                : [];


        const lines =
            text
                ? text.split(/\r?\n/).length
                : 0;


        totalWordsElement.textContent =
            words.length;


        uniqueWordsElement.textContent =
            new Set(
                words.map(
                    word =>
                        word
                            .toLowerCase()
                            .replace(
                                /[^\w]/g,
                                ""
                            )
                ).filter(Boolean)
            ).size;


        charactersElement.textContent =
            text.length;


        linesElement.textContent =
            lines;
    }


    /* =====================================================
       EVENTS
       ===================================================== */

    guessButton.addEventListener(
        "click",
        submitGuess
    );


    resetButton.addEventListener(
        "click",
        startNewGame
    );


    analyzeButton.addEventListener(
        "click",
        analyzeText
    );


    sampleButton.addEventListener(
        "click",
        loadSample
    );


    guessInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {
                submitGuess();
            }

        }
    );


    textInput.addEventListener(
        "input",
        updateLiveStats
    );


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    updateLiveStats();

    startNewGame();

});