// ======================================================
// ALDEHYEL VOCAB
// Vocabulary + Active Recall + SRS
// Study Plan + Quiz + Streak + Dashboard
// Shuffle + Mark Learned + Theme Customizer
// ======================================================


// ======================================================
// DEFAULT WORDS — 46 ORIGINAL WORDS
// ======================================================

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


// ======================================================
// LOAD WORDS
// ======================================================

let words = JSON.parse(
    localStorage.getItem("aldehyelVocabWords")
);


// ======================================================
// MIGRATE OLD VOCABFLOW DATA
// ======================================================

if (!words) {

    const oldWords =
        JSON.parse(
            localStorage.getItem("vocabFlowWords")
        );

    if (oldWords) {

        words = oldWords;

        saveWords();

    }

}


// ======================================================
// CREATE DEFAULT WORDS
// ======================================================

if (!words) {

    words =
        defaultWords.map(
            (item, index) => ({

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

                createdByUser: false,

                lastReviewed: null,

                learned: false

            })
        );

    saveWords();

}


// ======================================================
// MIGRATE OLD WORD OBJECTS
// ======================================================

words.forEach(word => {

    if (
        word.learned === undefined
    ) {

        word.learned = false;

    }

    if (
        word.createdByUser === undefined
    ) {

        word.createdByUser = false;

    }

});

saveWords();


// ======================================================
// STUDY PLAN
// ======================================================

let studyPlan =
    JSON.parse(
        localStorage.getItem(
            "aldehyelVocabStudyPlan"
        )
    );


if (!studyPlan) {

    studyPlan = {

        wordsPerDay: 10,

        days: 15,

        startDate:
            new Date().toISOString()

    };

    saveStudyPlan();

}


function saveStudyPlan() {

    localStorage.setItem(
        "aldehyelVocabStudyPlan",

        JSON.stringify(studyPlan)
    );

}


// ======================================================
// STATE
// ======================================================

let currentIndex = 0;

let quizIndex = 0;

let quizAnswered = false;


// ======================================================
// ELEMENTS
// ======================================================

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

const showAnswerButton =
    document.getElementById("showAnswer");

const markLearnedButton =
    document.getElementById(
        "markLearnedButton"
    );

const deleteWordButton =
    document.getElementById(
        "deleteWordButton"
    );

const answer =
    document.getElementById("answer");

const recallPrompt =
    document.getElementById(
        "recallPrompt"
    );

const ratingButtons =
    document.querySelectorAll(
        ".rating"
    );

const previousButton =
    document.getElementById(
        "previous"
    );

const nextButton =
    document.getElementById(
        "next"
    );

const memoryMap =
    document.getElementById(
        "memoryMap"
    );

const queueStatus =
    document.getElementById(
        "queueStatus"
    );

const dailyTarget =
    document.getElementById(
        "dailyTarget"
    );

const dailyProgressBar =
    document.getElementById(
        "dailyProgressBar"
    );


// ======================================================
// STATS
// ======================================================

const newCount =
    document.getElementById(
        "newCount"
    );

const againCount =
    document.getElementById(
        "againCount"
    );

const hardCount =
    document.getElementById(
        "hardCount"
    );

const goodCount =
    document.getElementById(
        "goodCount"
    );

const easyCount =
    document.getElementById(
        "easyCount"
    );


// ======================================================
// DASHBOARD
// ======================================================

const streakCount =
    document.getElementById(
        "streakCount"
    );

const totalWords =
    document.getElementById(
        "totalWords"
    );

const masteredWords =
    document.getElementById(
        "masteredWords"
    );

const goalProgress =
    document.getElementById(
        "goalProgress"
    );


// ======================================================
// ADD WORD
// ======================================================

const addWordButton =
    document.getElementById(
        "addWordButton"
    );

const addWordModal =
    document.getElementById(
        "addWordModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const addWordForm =
    document.getElementById(
        "addWordForm"
    );

const newWord =
    document.getElementById(
        "newWord"
    );

const newMeaning =
    document.getElementById(
        "newMeaning"
    );

const newExample =
    document.getElementById(
        "newExample"
    );

const newType =
    document.getElementById(
        "newType"
    );


// ======================================================
// STUDY PLAN
// ======================================================

const studyPlanButton =
    document.getElementById(
        "studyPlanButton"
    );

const studyPlanModal =
    document.getElementById(
        "studyPlanModal"
    );

const closeStudyPlan =
    document.getElementById(
        "closeStudyPlan"
    );

const wordsPerDay =
    document.getElementById(
        "wordsPerDay"
    );

const studyDays =
    document.getElementById(
        "studyDays"
    );

const planTotal =
    document.getElementById(
        "planTotal"
    );

const saveStudyPlanButton =
    document.getElementById(
        "saveStudyPlan"
    );


// ======================================================
// QUIZ
// ======================================================

const quizButton =
    document.getElementById(
        "quizButton"
    );

const quizModal =
    document.getElementById(
        "quizModal"
    );

const closeQuiz =
    document.getElementById(
        "closeQuiz"
    );

const quizWord =
    document.getElementById(
        "quizWord"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const nextQuiz =
    document.getElementById(
        "nextQuiz"
    );


// ======================================================
// SHUFFLE
// ======================================================

const shuffleButton =
    document.getElementById(
        "shuffleButton"
    );


// ======================================================
// THEME
// ======================================================

const themeButton =
    document.getElementById(
        "themeButton"
    );

const themeModal =
    document.getElementById(
        "themeModal"
    );

const closeTheme =
    document.getElementById(
        "closeTheme"
    );

const customColor =
    document.getElementById(
        "customColor"
    );

const colorValue =
    document.getElementById(
        "colorValue"
    );

const resetTheme =
    document.getElementById(
        "resetTheme"
    );

const themePresets =
    document.querySelectorAll(
        ".theme-preset"
    );


// ======================================================
// DELETE ALL
// ======================================================

const deleteAllModal =
    document.getElementById(
        "deleteAllModal"
    );

const closeDeleteAll =
    document.getElementById(
        "closeDeleteAll"
    );

const deleteAllOriginalButton =
    document.getElementById(
        "deleteAllOriginalButton"
    );


// ======================================================
// SAVE WORDS
// ======================================================

function saveWords() {

    localStorage.setItem(
        "aldehyelVocabWords",

        JSON.stringify(words)
    );

}


// ======================================================
// DATE HELPERS
// ======================================================

function getDateKey(
    date = new Date()
) {

    return date
        .toISOString()
        .split("T")[0];

}


function isToday(
    dateString
) {

    if (!dateString) {

        return false;

    }

    return (
        getDateKey(
            new Date(dateString)
        )
        ===
        getDateKey()
    );

}


// ======================================================
// STATUS
// ======================================================

function getStatusClass(word) {

    if (
        word.status ===
        "need-to-learn"
    ) {

        return "again";

    }

    if (
        word.status ===
        "difficult"
    ) {

        return "hard";

    }

    if (
        word.status ===
        "learning"
    ) {

        return "good";

    }

    if (
        word.status ===
        "mastered"
    ) {

        return "easy";

    }

    return "";

}


function getStatusText(
    status
) {

    if (
        status ===
        "need-to-learn"
    ) {

        return "Need to learn";

    }

    if (
        status ===
        "difficult"
    ) {

        return "Difficult";

    }

    if (
        status ===
        "learning"
    ) {

        return "Learning";

    }

    if (
        status ===
        "mastered"
    ) {

        return "Mastered";

    }

    return "New";

}


// ======================================================
// MEMORY MAP
// ======================================================

function renderMemoryMap() {

    memoryMap.innerHTML = "";

    words.forEach(
        (word, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "memory-dot";


            const statusClass =
                getStatusClass(word);


            if (statusClass) {

                button.classList.add(
                    statusClass
                );

            }


            if (
                index ===
                currentIndex
            ) {

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
                () => {

                    currentIndex =
                        index;

                    showCard();

                }
            );


            memoryMap.appendChild(
                button
            );

        }
    );

}


// ======================================================
// STATS
// ======================================================

function updateStats() {

    let newWords = 0;

    let againWords = 0;

    let hardWords = 0;

    let goodWords = 0;

    let easyWords = 0;


    words.forEach(
        word => {

            if (
                word.status ===
                "new"
            ) {

                newWords++;

            }


            if (
                word.status ===
                "need-to-learn"
            ) {

                againWords++;

            }


            if (
                word.status ===
                "difficult"
            ) {

                hardWords++;

            }


            if (
                word.status ===
                "learning"
            ) {

                goodWords++;

            }


            if (
                word.status ===
                "mastered"
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


    queueStatus.textContent =
        `${getReviewQueue().length} words to review`;

}


// ======================================================
// REVIEW QUEUE
// ======================================================

function getReviewQueue() {

    const now =
        Date.now();


    return words.filter(
        word => {

            if (
                !word.nextReview
            ) {

                return false;

            }


            return (
                new Date(
                    word.nextReview
                ).getTime()
                <=
                now
            );

        }
    );

}


// ======================================================
// STUDY DAY
// ======================================================

function getStudyDay() {

    const start =
        new Date(
            studyPlan.startDate
        );


    const now =
        new Date();


    const startDay =
        new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate()
        );


    const today =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );


    const difference =
        Math.floor(
            (
                today -
                startDay
            )
            /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    return Math.min(
        Math.max(
            difference + 1,
            1
        ),
        studyPlan.days
    );

}


// ======================================================
// DAILY WORDS
// ======================================================

function getDailyWords() {

    const day =
        getStudyDay();


    const start =
        (
            day - 1
        )
        *
        studyPlan.wordsPerDay;


    const end =
        start +
        studyPlan.wordsPerDay;


    return words.slice(
        start,
        end
    );

}


// ======================================================
// DAILY PROGRESS
// ======================================================

function updateDailyProgress() {

    const todayWords =
        getDailyWords();


    const completed =
        todayWords.filter(
            word =>
                word.lastReviewed &&
                isToday(
                    word.lastReviewed
                )
        ).length;


    const target =
        Math.min(
            studyPlan.wordsPerDay,
            todayWords.length
        );


    dailyTarget.textContent =
        `${completed} / ${target} words`;


    const percent =
        target === 0
            ? 0
            :
            (
                completed /
                target
            )
            *
            100;


    dailyProgressBar.style.width =
        `${Math.min(
            percent,
            100
        )}%`;


    goalProgress.textContent =
        `${Math.round(
            Math.min(
                percent,
                100
            )
        )}%`;

}


// ======================================================
// STREAK
// ======================================================

function calculateStreak() {

    const reviewedDates =
        new Set();


    words.forEach(
        word => {

            if (
                word.lastReviewed
            ) {

                reviewedDates.add(
                    getDateKey(
                        new Date(
                            word.lastReviewed
                        )
                    )
                );

            }

        }
    );


    let streak = 0;


    let current =
        new Date();


    while (true) {

        const key =
            getDateKey(
                current
            );


        if (
            reviewedDates.has(
                key
            )
        ) {

            streak++;


            current.setDate(
                current.getDate() - 1
            );

        } else {

            break;

        }

    }


    return streak;

}


// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard() {

    totalWords.textContent =
        words.length;


    masteredWords.textContent =
        words.filter(
            word =>
                word.status ===
                "mastered"
        ).length;


    const streak =
        calculateStreak();


    streakCount.textContent =
        `${streak} ${
            streak === 1
                ? "day"
                : "days"
        }`;

}


// ======================================================
// SHOW CARD
// ======================================================

function showCard() {

    if (
        words.length === 0
    ) {

        wordElement.textContent =
            "No words yet";

        typeElement.textContent =
            "Vocabulary";

        meaningElement.textContent =
            "";

        exampleElement.textContent =
            "";

        counterElement.textContent =
            "0 / 0";

        deleteWordButton.style.display =
            "none";

        markLearnedButton.style.display =
            "none";

        showAnswerButton.style.display =
            "none";

        recallPrompt.style.display =
            "none";

        answer.style.display =
            "none";

        document.getElementById(
            "ratingButtons"
        ).style.display =
            "none";

        renderMemoryMap();

        updateStats();

        updateDailyProgress();

        updateDashboard();

        return;

    }


    if (
        currentIndex >=
        words.length
    ) {

        currentIndex =
            words.length - 1;

    }


    if (
        currentIndex < 0
    ) {

        currentIndex = 0;

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


    counterElement.textContent =
        `${currentIndex + 1} / ${words.length}`;


    dayElement.textContent =
        `Day ${getStudyDay()}`;


    // custom word can be deleted
    if (
        currentWord.createdByUser
    ) {

        deleteWordButton.style.display =
            "flex";

    } else {

        deleteWordButton.style.display =
            "none";

    }


    // mark learned button
    markLearnedButton.style.display =
        "block";


    if (
        currentWord.learned
    ) {

        markLearnedButton.textContent =
            "✓ Learned";

        markLearnedButton.classList.add(
            "learned"
        );

    } else {

        markLearnedButton.textContent =
            "✓ Mark as Learned";

        markLearnedButton.classList.remove(
            "learned"
        );

    }


    answer.style.display =
        "none";


    recallPrompt.style.display =
        "flex";


    showAnswerButton.style.display =
        "block";


    document.getElementById(
        "ratingButtons"
    ).style.display =
        "none";


    renderMemoryMap();

    updateStats();

    updateDailyProgress();

    updateDashboard();

}


// ======================================================
// SHOW ANSWER
// ======================================================

showAnswerButton.addEventListener(
    "click",
    () => {

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


// ======================================================
// MARK LEARNED
// ======================================================

markLearnedButton.addEventListener(
    "click",
    () => {

        if (
            words.length === 0
        ) {

            return;

        }


        const currentWord =
            words[currentIndex];


        if (
            currentWord.learned
        ) {

            return;

        }


        currentWord.learned =
            true;


        currentWord.lastReviewed =
            new Date().toISOString();


        if (
            currentWord.status ===
            "new"
        ) {

            currentWord.status =
                "learning";

        }


        saveWords();


        updateDailyProgress();

        updateDashboard();

        renderMemoryMap();

        showCard();

    }
);


// ======================================================
// RATING
// ======================================================

ratingButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    words.length === 0
                ) {

                    return;

                }


                const rating =
                    button.dataset.rating;


                const currentWord =
                    words[currentIndex];


                currentWord.rating =
                    rating;


                currentWord.reviews =
                    (
                        currentWord.reviews
                        ||
                        0
                    )
                    +
                    1;


                currentWord.lastReviewed =
                    new Date().toISOString();


                // rating automatically means
                // the learner has studied the word
                currentWord.learned =
                    true;


                if (
                    rating === "again"
                ) {

                    currentWord.status =
                        "need-to-learn";

                }


                if (
                    rating === "hard"
                ) {

                    currentWord.status =
                        "difficult";

                }


                if (
                    rating === "good"
                ) {

                    currentWord.status =
                        "learning";

                }


                if (
                    rating === "easy"
                ) {

                    currentWord.status =
                        "mastered";

                }


                currentWord.nextReview =
                    calculateNextReview(
                        rating,
                        currentWord
                    );


                saveWords();


                moveToNextCard();

            }
        );

    }
);


// ======================================================
// SRS
// ======================================================

function calculateNextReview(
    rating,
    word
) {

    const reviewCount =
        word.reviews || 1;


    let days;


    if (
        rating === "again"
    ) {

        return new Date(
            Date.now()
            +
            10 *
            60 *
            1000
        ).toISOString();

    }


    if (
        rating === "hard"
    ) {

        days =
            Math.min(
                2 *
                Math.pow(
                    1.3,
                    reviewCount - 1
                ),
                14
            );

    }


    if (
        rating === "good"
    ) {

        days =
            Math.min(
                3 *
                Math.pow(
                    1.8,
                    reviewCount - 1
                ),
                60
            );

    }


    if (
        rating === "easy"
    ) {

        days =
            Math.min(
                7 *
                Math.pow(
                    2.2,
                    reviewCount - 1
                ),
                180
            );

    }


    return new Date(
        Date.now()
        +
        days *
        24 *
        60 *
        60 *
        1000
    ).toISOString();

}


// ======================================================
// NEXT CARD
// ======================================================

function moveToNextCard() {

    if (
        currentIndex <
        words.length - 1
    ) {

        currentIndex++;

        showCard();

        return;

    }


    const reviewQueue =
        getReviewQueue();


    if (
        reviewQueue.length > 0
    ) {

        const reviewIndex =
            words.findIndex(
                word =>
                    word.id ===
                    reviewQueue[0].id
            );


        if (
            reviewIndex !== -1
        ) {

            currentIndex =
                reviewIndex;

            showCard();

            return;

        }

    }


    alert(
        "🎉 Great job! You completed this session."
    );

}


// ======================================================
// NEXT / PREVIOUS
// ======================================================

nextButton.addEventListener(
    "click",
    () => {

        if (
            currentIndex <
            words.length - 1
        ) {

            currentIndex++;

            showCard();

        }

    }
);


previousButton.addEventListener(
    "click",
    () => {

        if (
            currentIndex > 0
        ) {

            currentIndex--;

            showCard();

        }

    }
);


// ======================================================
// SHUFFLE
// ======================================================

shuffleButton.addEventListener(
    "click",
    () => {

        if (
            words.length < 2
        ) {

            return;

        }


        for (
            let i =
                words.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random()
                    *
                    (i + 1)
                );


            [
                words[i],
                words[j]
            ] =
            [
                words[j],
                words[i]
            ];

        }


        currentIndex = 0;

        saveWords();

        showCard();

    }
);


// ======================================================
// ADD WORD MODAL
// ======================================================

addWordButton.addEventListener(
    "click",
    () => {

        addWordModal.classList.remove(
            "hidden"
        );

        newWord.focus();

    }
);


closeModal.addEventListener(
    "click",
    closeAddModal
);


document
    .querySelector(
        "#addWordModal .modal-overlay"
    )
    .addEventListener(
        "click",
        closeAddModal
    );


function closeAddModal() {

    addWordModal.classList.add(
        "hidden"
    );

    addWordForm.reset();

}


// ======================================================
// ADD WORD
// ======================================================

addWordForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const word =
            newWord.value.trim();


        const meaning =
            newMeaning.value.trim();


        const example =
            newExample.value.trim();


        const type =
            newType.value;


        if (
            !word ||
            !meaning
        ) {

            return;

        }


        words.push({

            id: Date.now(),

            word,

            meaning,

            example:
                example ||
                "No example added yet.",

            type,

            day: null,

            status: "new",

            rating: null,

            reviews: 0,

            nextReview: null,

            createdByUser: true,

            lastReviewed: null,

            learned: false

        });


        saveWords();


        currentIndex =
            words.length - 1;


        closeAddModal();

        showCard();

    }
);


// ======================================================
// DELETE CUSTOM WORD
// ======================================================

deleteWordButton.addEventListener(
    "click",
    () => {

        if (
            words.length === 0
        ) {

            return;

        }


        const currentWord =
            words[currentIndex];


        if (
            !currentWord.createdByUser
        ) {

            alert(
                "The original Aldehyel Vocab words cannot be deleted individually."
            );

            return;

        }


        const confirmed =
            confirm(
                `Delete "${currentWord.word}"?`
            );


        if (!confirmed) {

            return;

        }


        words.splice(
            currentIndex,
            1
        );


        saveWords();


        if (
            currentIndex >=
            words.length
        ) {

            currentIndex =
                Math.max(
                    words.length - 1,
                    0
                );

        }


        showCard();

    }
);


// ======================================================
// STUDY PLAN
// ======================================================

studyPlanButton.addEventListener(
    "click",
    () => {

        wordsPerDay.value =
            studyPlan.wordsPerDay;


        studyDays.value =
            studyPlan.days;


        updatePlanPreview();


        studyPlanModal.classList.remove(
            "hidden"
        );

    }
);


closeStudyPlan.addEventListener(
    "click",
    closePlanModal
);


document
    .querySelector(
        "#studyPlanModal .modal-overlay"
    )
    .addEventListener(
        "click",
        closePlanModal
    );


function closePlanModal() {

    studyPlanModal.classList.add(
        "hidden"
    );

}


function updatePlanPreview() {

    const daily =
        Number(
            wordsPerDay.value
        )
        ||
        0;


    const days =
        Number(
            studyDays.value
        )
        ||
        0;


    planTotal.textContent =
        `${daily * days} words`;

}


wordsPerDay.addEventListener(
    "input",
    updatePlanPreview
);


studyDays.addEventListener(
    "input",
    updatePlanPreview
);


saveStudyPlanButton.addEventListener(
    "click",
    () => {

        const daily =
            Math.max(
                1,
                Number(
                    wordsPerDay.value
                )
            );


        const days =
            Math.max(
                1,
                Number(
                    studyDays.value
                )
            );


        studyPlan = {

            wordsPerDay:
                daily,

            days:
                days,

            startDate:
                new Date().toISOString()

        };


        saveStudyPlan();

        closePlanModal();

        showCard();

    }
);


// ======================================================
// QUIZ
// ======================================================

quizButton.addEventListener(
    "click",
    () => {

        if (
            words.length < 4
        ) {

            alert(
                "You need at least 4 words to start the quiz."
            );

            return;

        }


        quizModal.classList.remove(
            "hidden"
        );


        startQuiz();

    }
);


closeQuiz.addEventListener(
    "click",
    () => {

        quizModal.classList.add(
            "hidden"
        );

    }
);


document
    .querySelector(
        "#quizModal .modal-overlay"
    )
    .addEventListener(
        "click",
        () => {

            quizModal.classList.add(
                "hidden"
            );

        }
    );


function startQuiz() {

    quizAnswered =
        false;


    quizResult.textContent =
        "";


    nextQuiz.style.display =
        "none";


    quizIndex =
        Math.floor(
            Math.random()
            *
            words.length
        );


    const question =
        words[quizIndex];


    quizWord.textContent =
        question.word;


    const options =
        createQuizOptions(
            question
        );


    quizOptions.innerHTML =
        "";


    options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option.meaning;


            button.addEventListener(
                "click",
                () =>
                    answerQuiz(
                        button,
                        option,
                        question
                    )
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function createQuizOptions(
    question
) {

    const others =
        words.filter(
            word =>
                word.id !==
                question.id
        );


    const shuffled =
        [...others]
            .sort(
                () =>
                    Math.random() - 0.5
            )
            .slice(
                0,
                3
            );


    const options = [
        question,
        ...shuffled
    ];


    return options.sort(
        () =>
            Math.random() - 0.5
    );

}


function answerQuiz(
    button,
    selected,
    question
) {

    if (
        quizAnswered
    ) {

        return;

    }


    quizAnswered =
        true;


    const allOptions =
        document.querySelectorAll(
            ".quiz-option"
        );


    allOptions.forEach(
        optionButton => {

            if (
                optionButton.textContent ===
                question.meaning
            ) {

                optionButton.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected.id ===
        question.id
    ) {

        button.classList.add(
            "correct"
        );


        quizResult.textContent =
            "✓ Correct!";


        quizResult.style.color =
            "#429060";

    } else {

        button.classList.add(
            "wrong"
        );


        quizResult.textContent =
            `✗ The correct answer is: ${question.meaning}`;


        quizResult.style.color =
            "#c75252";

    }


    nextQuiz.style.display =
        "block";

}


nextQuiz.addEventListener(
    "click",
    startQuiz
);


// ======================================================
// THEME SYSTEM
// ======================================================

function hexToRgb(hex) {

    hex =
        hex.replace(
            "#",
            ""
        );


    const bigint =
        parseInt(
            hex,
            16
        );


    return {

        r:
            (bigint >> 16)
            &
            255,

        g:
            (bigint >> 8)
            &
            255,

        b:
            bigint
            &
            255

    };

}


function setThemeColor(
    color
) {

    const rgb =
        hexToRgb(
            color
        );


    const root =
        document.documentElement;


    root.style.setProperty(
        "--accent",
        color
    );


    root.style.setProperty(
        "--accent-dark",
        shadeColor(
            color,
            -12
        )
    );


    root.style.setProperty(
        "--accent-light",
        hexToRgba(
            color,
            0.10
        )
    );


    root.style.setProperty(
        "--accent-soft",
        hexToRgba(
            color,
            0.045
        )
    );


    root.style.setProperty(
        "--accent-border",
        hexToRgba(
            color,
            0.20
        )
    );


    root.style.setProperty(
        "--accent-shadow",
        `rgba(
            ${rgb.r},
            ${rgb.g},
            ${rgb.b},
            0.22
        )`
    );


    customColor.value =
        color;


    colorValue.textContent =
        color.toUpperCase();


    localStorage.setItem(
        "aldehyelVocabTheme",
        color
    );

}


function hexToRgba(
    hex,
    alpha
) {

    const rgb =
        hexToRgb(
            hex
        );


    return `rgba(
        ${rgb.r},
        ${rgb.g},
        ${rgb.b},
        ${alpha}
    )`;

}


function shadeColor(
    color,
    percent
) {

    let R =
        parseInt(
            color.substring(
                1,
                3
            ),
            16
        );


    let G =
        parseInt(
            color.substring(
                3,
                5
            ),
            16
        );


    let B =
        parseInt(
            color.substring(
                5,
                7
            ),
            16
        );


    R =
        Math.max(
            0,
            Math.min(
                255,
                R *
                (
                    100 +
                    percent
                )
                /
                100
            )
        );


    G =
        Math.max(
            0,
            Math.min(
                255,
                G *
                (
                    100 +
                    percent
                )
                /
                100
            )
        );


    B =
        Math.max(
            0,
            Math.min(
                255,
                B *
                (
                    100 +
                    percent
                )
                /
                100
            )
        );


    return "#" +
        [R, G, B]
            .map(
                x =>
                    Math.round(x)
                        .toString(16)
                        .padStart(
                            2,
                            "0"
                        )
            )
            .join("");

}


// Load saved theme
const savedTheme =
    localStorage.getItem(
        "aldehyelVocabTheme"
    );


if (savedTheme) {

    setThemeColor(
        savedTheme
    );

}


themeButton.addEventListener(
    "click",
    () => {

        themeModal.classList.remove(
            "hidden"
        );

    }
);


closeTheme.addEventListener(
    "click",
    () => {

        themeModal.classList.add(
            "hidden"
        );

    }
);


document
    .querySelector(
        "#themeModal .modal-overlay"
    )
    .addEventListener(
        "click",
        () => {

            themeModal.classList.add(
                "hidden"
            );

        }
    );


themePresets.forEach(
    preset => {

        preset.addEventListener(
            "click",
            () => {

                setThemeColor(
                    preset.dataset.color
                );

            }
        );

    }
);


customColor.addEventListener(
    "input",
    () => {

        setThemeColor(
            customColor.value
        );

    }
);


resetTheme.addEventListener(
    "click",
    () => {

        setThemeColor(
            "#7054d8"
        );

    }
);


// ======================================================
// DELETE ALL ORIGINAL WORDS
// ======================================================

deleteAllModal.addEventListener(
    "click",
    () => {}
);


// Hidden access:
// double-click the brand icon
document
    .querySelector(
        ".brand-icon"
    )
    .addEventListener(
        "dblclick",
        () => {

            deleteAllModal.classList.remove(
                "hidden"
            );

        }
    );


closeDeleteAll.addEventListener(
    "click",
    () => {

        deleteAllModal.classList.add(
            "hidden"
        );

    }
);


document
    .querySelector(
        "#deleteAllModal .modal-overlay"
    )
    .addEventListener(
        "click",
        () => {

            deleteAllModal.classList.add(
                "hidden"
            );

        }
    );


deleteAllOriginalButton.addEventListener(
    "click",
    () => {

        const originalCount =
            words.filter(
                word =>
                    !word.createdByUser
            ).length;


        if (
            originalCount === 0
        ) {

            alert(
                "There are no original words left."
            );

            return;

        }


        const confirmed =
            confirm(
                `Delete all ${originalCount} original words? Your custom words will NOT be deleted.`
            );


        if (!confirmed) {

            return;

        }


        words =
            words.filter(
                word =>
                    word.createdByUser
            );


        currentIndex = 0;


        saveWords();


        deleteAllModal.classList.add(
            "hidden"
        );


        showCard();


        alert(
            "🗑️ All original words have been deleted."
        );

    }
);


// ======================================================
// KEYBOARD
// ======================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space"
            &&
            answer.style.display !==
            "block"
        ) {

            event.preventDefault();

            if (
                showAnswerButton.style.display !==
                "none"
            ) {

                showAnswerButton.click();

            }

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextButton.click();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousButton.click();

        }

    }
);


// ======================================================
// INITIALISE
// ======================================================

showCard();