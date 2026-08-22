// ==========================================
// VOCABFLOW
// Vocabulary + Active Recall + SRS
// ==========================================


// ==========================================
// DEFAULT WORDS
// ==========================================

const defaultWords = [
    ["give up", "to stop trying", "She refused to give up despite several setbacks.", "Phrasal Verb", 1],
    ["take up", "to start doing a new activity", "I recently took up swimming.", "Phrasal Verb", 1],
    ["keep up with", "to stay at the same level or pace", "It is difficult to keep up with the latest technology.", "Phrasal Verb", 1],

    ["deal with", "to handle or manage something", "Students need to learn how to deal with stress.", "Phrasal Verb", 2],
    ["look forward to", "to feel excited about something that will happen", "I look forward to studying at university.", "Phrasal Verb", 2],
    ["carry out", "to do or complete something", "The researchers carried out a detailed study.", "Phrasal Verb", 2],

    ["meet a deadline", "to finish something by the required time", "Students often struggle to meet tight deadlines.", "Collocation", 3],
    ["make progress", "to improve or develop", "She has made significant progress in English.", "Collocation", 3],
    ["take responsibility", "to accept responsibility for something", "Young people should learn to take responsibility for their actions.", "Collocation", 3],

    ["break down", "to fail or stop working", "My computer suddenly broke down.", "Phrasal Verb", 4],
    ["come up with", "to think of an idea or solution", "We need to come up with a better solution.", "Phrasal Verb", 4],
    ["bring up", "to mention a topic", "She brought up an interesting point.", "Phrasal Verb", 4],

    ["have access to", "to be able to use or obtain something", "Students should have access to quality education.", "Collocation", 5],
    ["play a role", "to have an influence or function", "Technology plays an important role in education.", "Collocation", 5],
    ["raise awareness", "to make people more aware of an issue", "Campaigns can raise awareness of environmental problems.", "Collocation", 5],

    ["figure out", "to understand or solve something", "I finally figured out how to use the software.", "Phrasal Verb", 6],
    ["run into", "to experience a problem or difficulty", "We ran into several problems during the project.", "Phrasal Verb", 6],
    ["cut down on", "to reduce the amount of something", "I am trying to cut down on social media.", "Phrasal Verb", 6],

    ["achieve a goal", "to successfully reach an aim", "Hard work is essential to achieve your goals.", "Collocation", 7],
    ["gain experience", "to obtain knowledge or skills through experience", "Part-time jobs allow students to gain valuable experience.", "Collocation", 7],
    ["develop skills", "to improve or build abilities", "Students need opportunities to develop practical skills.", "Collocation", 7],

    ["turn out", "to have a particular result", "The exam turned out to be easier than expected.", "Phrasal Verb", 8],
    ["put off", "to delay doing something", "Many students put off studying until the last minute.", "Phrasal Verb", 8],
    ["work out", "to solve a problem or find a solution", "We eventually worked out a solution.", "Phrasal Verb", 8],

    ["meet expectations", "to be as good as people expected", "The new product failed to meet customers' expectations.", "Collocation", 9],
    ["face challenges", "to experience difficult situations", "Young people face numerous challenges today.", "Collocation", 9],
    ["overcome obstacles", "to successfully deal with difficulties", "She managed to overcome many obstacles.", "Collocation", 9],

    ["look into", "to investigate something", "The school is looking into the problem.", "Phrasal Verb", 10],
    ["go through", "to experience something difficult", "Many teenagers go through periods of stress.", "Phrasal Verb", 10],
    ["get over", "to recover from something", "It took him a while to get over the disappointment.", "Phrasal Verb", 10],

    ["make a decision", "to decide something", "It is important to make informed decisions.", "Collocation", 11],
    ["take measures", "to take actions to deal with a problem", "Governments should take measures to reduce pollution.", "Collocation", 11],
    ["meet a need", "to provide what is necessary", "The course is designed to meet students' needs.", "Collocation", 11],

    ["set up", "to establish or arrange something", "They set up a new study group.", "Phrasal Verb", 12],
    ["find out", "to discover information", "I found out about the course online.", "Phrasal Verb", 12],
    ["go over", "to review something carefully", "I went over my notes before the exam.", "Phrasal Verb", 12],

    ["build confidence", "to become more confident", "Speaking practice helps students build confidence.", "Collocation", 13],
    ["broaden one's horizons", "to expand one's knowledge and experience", "Travelling can broaden your horizons.", "Collocation", 13],
    ["keep a balance", "to maintain a balanced situation", "Students should keep a balance between study and leisure.", "Collocation", 13],

    ["catch up with", "to reach the same level as someone or something", "I need to catch up with my classmates.", "Phrasal Verb", 14],
    ["fall behind", "to fail to stay at the same level or pace", "Students can easily fall behind if they miss classes.", "Phrasal Verb", 14],
    ["brush up on", "to improve partly forgotten knowledge or skills", "I need to brush up on my grammar.", "Phrasal Verb", 14],

    ["achieve academic success", "to succeed in education", "Good study habits can help students achieve academic success.", "Collocation", 15],
    ["cope with pressure", "to deal successfully with pressure", "Students need to learn how to cope with academic pressure.", "Collocation", 15],
    ["strike a balance", "to find a healthy balance between two things", "It is important to strike a balance between work and relaxation.", "Collocation", 15],
    ["make an effort", "to try hard to do something", "Students need to make an effort to improve their vocabulary.", "Collocation", 15]
];


// ==========================================
// LOAD WORDS
// ==========================================

let words =
    JSON.parse(
        localStorage.getItem("vocabFlowWords")
    );

if (!words) {

    words = defaultWords.map(
        function(item, index) {

            return {
                id: index + 1,
                word: item[0],
                meaning: item[1],
                example: item[2],
                type: item[3],
                day: item[4],

                status: "new",

                rating: null,

                reviews: 0,

                nextReview: null,

                createdByUser: false
            };

        }
    );

    saveWords();
}


// ==========================================
// STATE
// ==========================================

let currentIndex = 0;

let sessionOrder = [];


// ==========================================
// ELEMENTS
// ==========================================

const wordElement =
    document.getElementById("word");

const typeElement =
    document.getElementById("type");

const meaningElement =
    document.getElementById("meaning");

const exampleElement =
    document.getElementById("example");

const dayElement =
    document.getElementById("day");

const counterElement =
    document.getElementById("counter");

const progressBar =
    document.getElementById("progressBar");

const showAnswerButton =
    document.getElementById("showAnswer");

const answer =
    document.getElementById("answer");

const recallPrompt =
    document.getElementById("recallPrompt");

const ratingButtons =
    document.querySelectorAll(".rating");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const memoryMap =
    document.getElementById("memoryMap");

const queueStatus =
    document.getElementById("queueStatus");

const sessionStatus =
    document.getElementById("sessionStatus");


// Stats

const newCount =
    document.getElementById("newCount");

const againCount =
    document.getElementById("againCount");

const hardCount =
    document.getElementById("hardCount");

const goodCount =
    document.getElementById("goodCount");

const easyCount =
    document.getElementById("easyCount");


// Modal

const addWordButton =
    document.getElementById("addWordButton");

const addWordModal =
    document.getElementById("addWordModal");

const closeModal =
    document.getElementById("closeModal");

const addWordForm =
    document.getElementById("addWordForm");


// Inputs

const newWord =
    document.getElementById("newWord");

const newMeaning =
    document.getElementById("newMeaning");

const newExample =
    document.getElementById("newExample");

const newType =
    document.getElementById("newType");


// ==========================================
// SAVE WORDS
// ==========================================

function saveWords() {

    localStorage.setItem(
        "vocabFlowWords",
        JSON.stringify(words)
    );

}


// ==========================================
// STATUS
// ==========================================

function getStatusClass(word) {

    if (word.status === "need-to-learn") {
        return "again";
    }

    if (word.status === "difficult") {
        return "hard";
    }

    if (word.status === "learning") {
        return "good";
    }

    if (word.status === "mastered") {
        return "easy";
    }

    return "";

}


// ==========================================
// MEMORY MAP
// ==========================================

function renderMemoryMap() {

    memoryMap.innerHTML = "";


    words.forEach(
        function(word, index) {

            const button =
                document.createElement("button");

            button.className =
                "memory-dot";


            const statusClass =
                getStatusClass(word);


            if (statusClass) {

                button.classList.add(
                    statusClass
                );

            }


            if (index === currentIndex) {

                button.classList.add(
                    "current"
                );

            }


            button.textContent =
                index + 1;


            button.title =
                `${word.word} — ${getStatusText(word.status)}`;


            button.addEventListener(
                "click",
                function() {

                    currentIndex = index;

                    showCard();

                }
            );


            memoryMap.appendChild(
                button
            );

        }
    );

}


// ==========================================
// STATUS TEXT
// ==========================================

function getStatusText(status) {

    if (status === "need-to-learn") {
        return "Need to learn";
    }

    if (status === "difficult") {
        return "Difficult";
    }

    if (status === "learning") {
        return "Learning";
    }

    if (status === "mastered") {
        return "Mastered";
    }

    return "New";

}


// ==========================================
// STATISTICS
// ==========================================

function updateStats() {

    let newWords = 0;
    let againWords = 0;
    let hardWords = 0;
    let goodWords = 0;
    let easyWords = 0;


    words.forEach(
        function(word) {

            if (word.status === "new") {
                newWords++;
            }

            else if (
                word.status === "need-to-learn"
            ) {
                againWords++;
            }

            else if (
                word.status === "difficult"
            ) {
                hardWords++;
            }

            else if (
                word.status === "learning"
            ) {
                goodWords++;
            }

            else if (
                word.status === "mastered"
            ) {
                easyWords++;
            }

        }
    );


    newCount.textContent =
        newWords;

    againCount.textContent =
        againWords;

    hardCount.textContent =
        hardWords;

    goodCount.textContent =
        goodWords;

    easyCount.textContent =
        easyWords;


    const reviewCount =
        getReviewQueue().length;


    queueStatus.textContent =
        `${reviewCount} words to review`;

}


// ==========================================
// REVIEW QUEUE
// ==========================================

function getReviewQueue() {

    const now =
        Date.now();


    return words.filter(
        function(word) {

            if (!word.nextReview) {
                return false;
            }

            return (
                new Date(word.nextReview)
                .getTime()
                <= now
            );

        }
    );

}


// ==========================================
// SHOW CARD
// ==========================================

function showCard() {

    if (words.length === 0) {

        wordElement.textContent =
            "No words yet";

        return;

    }


    const currentWord =
        words[currentIndex];


    wordElement.textContent =
        currentWord.word;


    typeElement.textContent =
        currentWord.type;


    meaningElement.textContent =
        currentWord.meaning;


    exampleElement.textContent =
        `"${currentWord.example}"`;


    dayElement.textContent =
        currentWord.day
            ? `Day ${currentWord.day}`
            : "Custom";


    counterElement.textContent =
        `${currentIndex + 1} / ${words.length}`;


    progressBar.style.width =
        `${((currentIndex + 1) / words.length) * 100}%`;


    // Hide answer

    answer.style.display =
        "none";


    recallPrompt.style.display =
        "flex";


    showAnswerButton.style.display =
        "block";


    showAnswerButton.textContent =
        "Show Answer";


    // Hide ratings

    document.getElementById(
        "ratingButtons"
    ).style.display =
        "none";


    sessionStatus.textContent =
        getStatusText(
            currentWord.status
        );


    renderMemoryMap();

    updateStats();

}


// ==========================================
// SHOW ANSWER
// ==========================================

showAnswerButton.addEventListener(
    "click",
    function() {

        answer.style.display =
            "block";


        recallPrompt.style.display =
            "none";


        showAnswerButton.style.display =
            "none";


        document.getElementById(
            "ratingButtons"
        ).style.display =
            "block";

    }
);


// ==========================================
// RATING
// ==========================================

ratingButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const rating =
                    button.dataset.rating;


                const currentWord =
                    words[currentIndex];


                currentWord.rating =
                    rating;


                currentWord.reviews++;


                currentWord.nextReview =
                    calculateNextReview(
                        rating
                    );


                // Set memory status

                if (rating === "again") {

                    currentWord.status =
                        "need-to-learn";

                }

                else if (rating === "hard") {

                    currentWord.status =
                        "difficult";

                }

                else if (rating === "good") {

                    currentWord.status =
                        "learning";

                }

                else if (rating === "easy") {

                    currentWord.status =
                        "mastered";

                }


                saveWords();


                /*
                    IMPORTANT:

                    Again / Hard do NOT disappear.

                    We move forward first.
                    They remain in the Memory Map
                    and enter the Review Queue.
                */


                moveToNextCard();

            }
        );

    }
);


// ==========================================
// SRS TIMING
// ==========================================

function calculateNextReview(rating) {

    const now =
        Date.now();


    let minutes;


    if (rating === "again") {

        // 10 minutes

        minutes =
            10;

    }

    else if (rating === "hard") {

        // 1 day

        minutes =
            24 * 60;

    }

    else if (rating === "good") {

        // 3 days

        minutes =
            3 * 24 * 60;

    }

    else {

        // 7 days

        minutes =
            7 * 24 * 60;

    }


    return new Date(
        now + minutes * 60 * 1000
    ).toISOString();

}


// ==========================================
// NEXT CARD
// ==========================================

function moveToNextCard() {

    if (
        currentIndex
        <
        words.length - 1
    ) {

        currentIndex++;

        showCard();

        return;

    }


    // We reached the end.

    const reviewQueue =
        getReviewQueue();


    if (reviewQueue.length > 0) {

        /*
            Find the first word that
            needs review.
        */

        const reviewIndex =
            words.findIndex(
                function(word) {

                    return (
                        word.id
                        ===
                        reviewQueue[0].id
                    );

                }
            );


        if (reviewIndex !== -1) {

            currentIndex =
                reviewIndex;

            showCard();

            sessionStatus.textContent =
                "Review time";

            return;

        }

    }


    alert(
        "🎉 Great job! You completed this session."
    );

}


// ==========================================
// NEXT BUTTON
// ==========================================

nextButton.addEventListener(
    "click",
    function() {

        if (
            currentIndex
            <
            words.length - 1
        ) {

            currentIndex++;

            showCard();

        }

    }
);


// ==========================================
// PREVIOUS BUTTON
// ==========================================

previousButton.addEventListener(
    "click",
    function() {

        if (
            currentIndex
            >
            0
        ) {

            currentIndex--;

            showCard();

        }

    }
);


// ==========================================
// ADD WORD MODAL
// ==========================================

addWordButton.addEventListener(
    "click",
    function() {

        addWordModal.classList.remove(
            "hidden"
        );

        newWord.focus();

    }
);


closeModal.addEventListener(
    "click",
    function() {

        closeAddWordModal();

    }
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        function() {

            closeAddWordModal();

        }
    );


function closeAddWordModal() {

    addWordModal.classList.add(
        "hidden"
    );

    addWordForm.reset();

}


// ==========================================
// ADD NEW WORD
// ==========================================

addWordForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const word =
            newWord.value.trim();

        const meaning =
            newMeaning.value.trim();

        const example =
            newExample.value.trim();

        const type =
            newType.value;


        if (!word || !meaning) {

            return;

        }


        const newVocabulary = {

            id:
                Date.now(),

            word:
                word,

            meaning:
                meaning,

            example:
                example ||
                "No example added yet.",

            type:
                type,

            day:
                null,

            status:
                "new",

            rating:
                null,

            reviews:
                0,

            nextReview:
                null,

            createdByUser:
                true

        };


        words.push(
            newVocabulary
        );


        saveWords();


        /*
            Go directly to the
            newly added word.
        */

        currentIndex =
            words.length - 1;


        closeAddWordModal();

        showCard();


        alert(
            `✓ "${word}" has been added!`
        );

    }
);


// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        /*
            Space = Show Answer
        */

        if (
            event.code === "Space"
            &&
            answer.style.display !== "block"
        ) {

            event.preventDefault();

            showAnswerButton.click();

        }


        /*
            Arrow Right = Next
        */

        if (
            event.key === "ArrowRight"
        ) {

            nextButton.click();

        }


        /*
            Arrow Left = Previous
        */

        if (
            event.key === "ArrowLeft"
        ) {

            previousButton.click();

        }

    }
);


// ==========================================
// INITIALISE
// ==========================================

showCard();