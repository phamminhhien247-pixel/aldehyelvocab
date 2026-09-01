// ======================================================
// ALDEHYEL VOCAB
// Vocabulary + Active Recall + SRS + Study Plan
// Quiz + Speaking + Shuffle + Theme
// ======================================================


const defaultWords = [

    ["give up","to stop trying","She refused to give up despite several setbacks.","Phrasal Verb"],

    ["take up","to start doing a new activity","I recently took up swimming.","Phrasal Verb"],

    ["keep up with","to stay at the same level or pace","It is difficult to keep up with the latest technology.","Phrasal Verb"],

    ["deal with","to handle or manage something","Students need to learn how to deal with stress.","Phrasal Verb"],

    ["look forward to","to feel excited about something that will happen","I look forward to studying at university.","Phrasal Verb"],

    ["carry out","to do or complete something","The researchers carried out a detailed study.","Phrasal Verb"],

    ["meet a deadline","to finish something by the required time","Students often struggle to meet tight deadlines.","Collocation"],

    ["make progress","to improve or develop","She has made significant progress in English.","Collocation"],

    ["take responsibility","to accept responsibility for something","Young people should learn to take responsibility for their actions.","Collocation"],

    ["break down","to fail or stop working","My computer suddenly broke down.","Phrasal Verb"],

    ["come up with","to think of an idea or solution","We need to come up with a better solution.","Phrasal Verb"],

    ["bring up","to mention a topic","She brought up an interesting point.","Phrasal Verb"],

    ["have access to","to be able to use or obtain something","Students should have access to quality education.","Collocation"],

    ["play a role","to have an influence or function","Technology plays an important role in education.","Collocation"],

    ["raise awareness","to make people more aware of an issue","Campaigns can raise awareness of environmental problems.","Collocation"],

    ["figure out","to understand or solve something","I finally figured out how to use the software.","Phrasal Verb"],

    ["run into","to experience a problem or difficulty","We ran into several problems during the project.","Phrasal Verb"],

    ["cut down on","to reduce the amount of something","I am trying to cut down on social media.","Phrasal Verb"],

    ["achieve a goal","to successfully reach an aim","Hard work is essential to achieve your goals.","Collocation"],

    ["gain experience","to obtain knowledge or skills through experience","Part-time jobs allow students to gain valuable experience.","Collocation"],

    ["develop skills","to improve or build abilities","Students need opportunities to develop practical skills.","Collocation"],

    ["turn out","to have a particular result","The exam turned out to be easier than expected.","Phrasal Verb"],

    ["put off","to delay doing something","Many students put off studying until the last minute.","Phrasal Verb"],

    ["work out","to solve a problem or find a solution","We eventually worked out a solution.","Phrasal Verb"],

    ["meet expectations","to be as good as people expected","The new product failed to meet customers' expectations.","Collocation"],

    ["face challenges","to experience difficult situations","Young people face numerous challenges today.","Collocation"],

    ["overcome obstacles","to successfully deal with difficulties","She managed to overcome many obstacles.","Collocation"],

    ["look into","to investigate something","The school is looking into the problem.","Phrasal Verb"],

    ["go through","to experience something difficult","Many teenagers go through periods of stress.","Phrasal Verb"],

    ["get over","to recover from something","It took him a while to get over the disappointment.","Phrasal Verb"],

    ["make a decision","to decide something","It is important to make informed decisions.","Collocation"],

    ["take measures","to take actions to deal with a problem","Governments should take measures to reduce pollution.","Collocation"],

    ["meet a need","to provide what is necessary","The course is designed to meet students' needs.","Collocation"],

    ["set up","to establish or arrange something","They set up a new study group.","Phrasal Verb"],

    ["find out","to discover information","I found out about the course online.","Phrasal Verb"],

    ["go over","to review something carefully","I went over my notes before the exam.","Phrasal Verb"],

    ["build confidence","to become more confident","Speaking practice helps students build confidence.","Collocation"],

    ["broaden one's horizons","to expand one's knowledge and experience","Travelling can broaden your horizons.","Collocation"],

    ["keep a balance","to maintain a balanced situation","Students should keep a balance between study and leisure.","Collocation"],

    ["catch up with","to reach the same level or pace","I need to catch up with my classmates.","Phrasal Verb"],

    ["fall behind","to fail to stay at the same level or pace","Students can easily fall behind if they miss classes.","Phrasal Verb"],

    ["brush up on","to improve partly forgotten knowledge or skills","I need to brush up on my grammar.","Phrasal Verb"],

    ["achieve academic success","to succeed in education","Good study habits can help students achieve academic success.","Collocation"],

    ["cope with pressure","to deal successfully with pressure","Students need to learn how to cope with academic pressure.","Collocation"],

    ["strike a balance","to find a healthy balance between two things","It is important to strike a balance between work and relaxation.","Collocation"],

    ["make an effort","to try hard to do something","Students need to make an effort to improve their vocabulary.","Collocation"]

];


// ======================================================
// STORAGE
// ======================================================

const WORD_KEY =
    "vocabFlowWords";

const PLAN_KEY =
    "vocabFlowStudyPlan";

const ACTIVITY_KEY =
    "vocabFlowActivity";

const THEME_KEY =
    "aldehyelTheme";


// ======================================================
// HELPERS
// ======================================================

const $ = id =>
    document.getElementById(id);


function today(){

    return new Date()
        .toISOString()
        .slice(0,10);

}


function escapeHTML(value){

    return String(value).replace(
        /[&<>"']/g,

        char => ({
            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            '"':"&quot;",
            "'":"&#039;"
        }[char])
    );

}


// ======================================================
// DEFAULT WORD CREATOR
// ======================================================

function createDefaultWords(){

    return defaultWords.map(
        (word,index) => ({

            id:index + 1,

            word:word[0],

            meaning:word[1],

            example:word[2],

            type:word[3],

            status:"new",

            rating:null,

            reviews:0,

            nextReview:null,

            srsLevel:0,

            createdByUser:false,

            lastReviewed:null,

            addedAt:Date.now()

        })
    );

}


// ======================================================
// LOAD DATA
// ======================================================

let words =
    JSON.parse(
        localStorage.getItem(
            WORD_KEY
        )
    );


if(
    !Array.isArray(words) ||
    !words.length
){

    words =
        createDefaultWords();

}


words =
    words.map(
        (word,index) => ({

            ...word,

            id:
                word.id ??
                index + 1,

            status:
                word.status ||
                "new",

            reviews:
                Number(word.reviews) ||
                0,

            srsLevel:
                Number(word.srsLevel) ||
                0,

            createdByUser:
                Boolean(
                    word.createdByUser
                )

        })
    );


let studyPlan =
    JSON.parse(
        localStorage.getItem(
            PLAN_KEY
        )
    )
    ||
    {

        wordsPerDay:10,

        days:15,

        startDate:today()

    };


let activity =
    JSON.parse(
        localStorage.getItem(
            ACTIVITY_KEY
        )
    )
    ||
    {

        days:[],

        lastStudy:null

    };


let currentIndex = 0;

let mode = "normal";

let shuffleOrder = [];

let quizState = null;


// ======================================================
// SAVE
// ======================================================

function save(){

    localStorage.setItem(
        WORD_KEY,
        JSON.stringify(words)
    );

    localStorage.setItem(
        PLAN_KEY,
        JSON.stringify(studyPlan)
    );

    localStorage.setItem(
        ACTIVITY_KEY,
        JSON.stringify(activity)
    );

}


// ======================================================
// STUDY DAY
// ======================================================

function studyDay(){

    const start =
        new Date(
            (studyPlan.startDate || today())
                .slice(0,10)
        );

    const current =
        new Date(today());

    const difference =
        Math.max(
            0,
            Math.floor(
                (
                    current -
                    start
                )
                /
                86400000
            )
        );

    return Math.min(
        difference + 1,
        studyPlan.days
    );

}


// ======================================================
// DAILY WORDS
// ======================================================

function dailyWords(){

    const start =
        (
            studyDay() - 1
        )
        *
        studyPlan.wordsPerDay;

    return words.slice(
        start,
        start +
        studyPlan.wordsPerDay
    );

}


// ======================================================
// DUE WORDS
// ======================================================

function dueWords(){

    const now =
        Date.now();

    return words.filter(
        word =>
            word.nextReview &&
            new Date(
                word.nextReview
            ).getTime()
            <=
            now
    );

}


// ======================================================
// ELEMENTS
// ======================================================

const elements = {

    word:
        $("word"),

    type:
        $("type"),

    meaning:
        $("meaning"),

    example:
        $("example"),

    day:
        $("day"),

    counter:
        $("counter"),

    answer:
        $("answer"),

    recall:
        $("recallPrompt"),

    show:
        $("showAnswer"),

    ratings:
        $("ratingButtons"),

    memory:
        $("memoryMap"),

    queue:
        $("queueStatus"),

    daily:
        $("dailyTarget"),

    bar:
        $("dailyProgressBar"),

    delete:
        $("deleteWordButton")

};


// ======================================================
// STATUS
// ======================================================

function statusClass(word){

    return {

        "need-to-learn":
            "again",

        difficult:
            "hard",

        learning:
            "good",

        mastered:
            "easy"

    }[
        word.status
    ] || "";

}


function statusName(status){

    return {

        new:
            "New",

        "need-to-learn":
            "Need to learn",

        difficult:
            "Difficult",

        learning:
            "Learning",

        mastered:
            "Mastered"

    }[
        status
    ]
    ||
    "New";

}


// ======================================================
// MEMORY MAP
// ======================================================

function renderMemory(){

    elements.memory.innerHTML = "";

    words.forEach(
        (word,index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                `
                memory-dot
                ${statusClass(word)}
                ${index === currentIndex
                    ? "current"
                    : ""}
                `;

            button.textContent =
                index + 1;

            button.title =
                `${word.word} — ${statusName(word.status)}`;

            button.onclick = () => {

                currentIndex =
                    index;

                mode =
                    "normal";

                showCard();

            };

            elements.memory.appendChild(
                button
            );

        }
    );

}


// ======================================================
// STATS
// ======================================================

function updateStats(){

    const counts = {

        new:0,

        "need-to-learn":0,

        difficult:0,

        learning:0,

        mastered:0

    };


    words.forEach(
        word => {

            counts[word.status] =
                (
                    counts[word.status]
                    ||
                    0
                )
                +
                1;

        }
    );


    $("newCount").textContent =
        counts.new;

    $("againCount").textContent =
        counts[
            "need-to-learn"
        ];

    $("hardCount").textContent =
        counts.difficult;

    $("goodCount").textContent =
        counts.learning;

    $("easyCount").textContent =
        counts.mastered;


    elements.queue.textContent =
        `${dueWords().length} words to review`;

}


// ======================================================
// STREAK
// ======================================================

function getStreak(){

    const set =
        new Set(
            activity.days || []
        );

    let date =
        new Date();

    let count = 0;


    while(
        set.has(
            date
                .toISOString()
                .slice(0,10)
        )
    ){

        count++;

        date.setDate(
            date.getDate() - 1
        );

    }


    return count;

}


// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard(){

    const learned =
        words.filter(
            word =>
                word.reviews > 0
        ).length;


    const remaining =
        Math.max(
            words.length -
            learned,

            0
        );


    const daily =
        dailyWords();


    const completedToday =
        daily.filter(
            word =>
                word.reviews > 0
        ).length;


    const percent =
        words.length
            ?
            Math.round(
                learned /
                words.length *
                100
            )
            :
            0;


    const dailyPercent =
        daily.length
            ?
            Math.min(
                100,

                Math.round(
                    completedToday /
                    daily.length *
                    100
                )
            )
            :
            0;


    $("totalWords").textContent =
        words.length;


    $("learnedWords").textContent =
        learned;


    $("remainingWords").textContent =
        remaining;


    $("goalProgress").textContent =
        percent + "%";


    $("streakCount").textContent =
        getStreak();


    $("completedWords").textContent =
        learned;


    $("progressTotal").textContent =
        words.length;


    $("progressPercent").textContent =
        percent + "%";


    $("progressRing").style.background =
        `
        conic-gradient(
            var(--primary)
            ${percent * 3.6}deg,

            #e8e7ef
            0deg
        )
        `;


    elements.daily.textContent =
        `${Math.min(
            completedToday,
            daily.length
        )} / ${daily.length} words`;


    $("dailyPercent").textContent =
        dailyPercent + "%";


    elements.bar.style.width =
        dailyPercent + "%";

}


// ======================================================
// SHOW CARD
// ======================================================

function showCard(){

    if(!words.length){

        elements.word.textContent =
            "No words yet";

        elements.type.textContent =
            "Vocabulary";

        elements.counter.textContent =
            "0 / 0";

        elements.delete.style.display =
            "none";

        elements.show.style.display =
            "none";

        elements.recall.style.display =
            "none";

        elements.ratings.style.display =
            "none";

        renderMemory();

        updateStats();

        updateDashboard();

        return;

    }


    currentIndex =
        Math.max(
            0,

            Math.min(
                currentIndex,

                words.length - 1
            )
        );


    const word =
        words[currentIndex];


    elements.word.textContent =
        word.word;


    elements.type.textContent =
        word.type;


    elements.meaning.textContent =
        word.meaning;


    elements.example.textContent =
        `“${word.example}”`;


    elements.day.textContent =
        `Day ${studyDay()}`;


    elements.counter.textContent =
        `${currentIndex + 1} / ${words.length}`;


    /*
        IMPORTANT:

        The delete button is ALWAYS visible.

        This means users can delete
        both the original 46 words
        and words they added themselves.
    */

    elements.delete.style.display =
        "grid";


    elements.answer.style.display =
        "none";


    elements.recall.style.display =
        "flex";


    elements.show.style.display =
        "block";


    elements.ratings.style.display =
        "none";


    renderMemory();

    updateStats();

    updateDashboard();

}


// ======================================================
// MARK STUDY ACTIVITY
// ======================================================

function markActivity(){

    const date =
        today();


    if(
        !activity.days.includes(
            date
        )
    ){

        activity.days.push(
            date
        );

    }


    activity.lastStudy =
        date;


    save();

}


// ======================================================
// SRS
// ======================================================

function calculateNextReview(
    word,
    rating
){

    const levels = [

        10,

        1440,

        4320,

        10080,

        20160,

        43200,

        86400

    ];


    let level =
        Math.min(
            6,

            Math.max(

                0,

                (
                    word.srsLevel ||
                    0
                )
                +
                (
                    rating === "easy"
                        ? 2
                        :
                    rating === "good"
                        ? 1
                        :
                    rating === "hard"
                        ? 0
                        :
                        -1
                )

            )
        );


    if(
        rating === "again"
    ){

        level = 0;

    }


    if(
        rating === "hard"
    ){

        level =
            Math.max(
                1,
                level
            );

    }


    word.srsLevel =
        level;


    word.nextReview =
        new Date(
            Date.now()
            +
            levels[level]
            *
            60000
        ).toISOString();

}


// ======================================================
// MOVE TO NEXT
// ======================================================

function moveNext(){

    if(
        mode === "review"
    ){

        const position =
            shuffleOrder.indexOf(
                words[currentIndex]?.id
            );


        if(
            position <
            shuffleOrder.length - 1
        ){

            currentIndex =
                words.findIndex(
                    word =>
                        word.id ===
                        shuffleOrder[
                            position + 1
                        ]
                );

            showCard();

        }
        else{

            mode =
                "normal";

            toast(
                "🎉 Thành công!",
                "Review session complete."
            );

        }

        return;

    }


    if(
        currentIndex <
        words.length - 1
    ){

        currentIndex++;

        showCard();

    }
    else{

        toast(
            "🎉 Great job!",
            "You completed this session."
        );

    }

}


// ======================================================
// SHOW ANSWER
// ======================================================

elements.show.onclick = () => {

    elements.answer.style.display =
        "block";

    elements.recall.style.display =
        "none";

    elements.show.style.display =
        "none";

    elements.ratings.style.display =
        "block";

};


// ======================================================
// RATING
// ======================================================

document
    .querySelectorAll(".rating")
    .forEach(
        button => {

            button.onclick = () => {

                const word =
                    words[currentIndex];

                const rating =
                    button.dataset.rating;


                word.rating =
                    rating;


                word.reviews++;


                word.status =
                    {

                        again:
                            "need-to-learn",

                        hard:
                            "difficult",

                        good:
                            "learning",

                        easy:
                            "mastered"

                    }[
                        rating
                    ];


                word.lastReviewed =
                    new Date()
                        .toISOString();


                calculateNextReview(
                    word,
                    rating
                );


                markActivity();

                save();

                showCard();


                setTimeout(
                    moveNext,
                    180
                );

            };

        }
    );


// ======================================================
// NEXT / PREVIOUS
// ======================================================

$("next").onclick = () => {

    if(
        currentIndex <
        words.length - 1
    ){

        currentIndex++;

        showCard();

    }

};


$("previous").onclick = () => {

    if(
        currentIndex > 0
    ){

        currentIndex--;

        showCard();

    }

};


// ======================================================
// SHUFFLE
// ======================================================

$("shuffleButton").onclick = () => {

    if(!words.length)
        return;


    shuffleOrder =
        [
            ...Array(
                words.length
            ).keys()
        ]
        .sort(
            () =>
                Math.random() - .5
        );


    currentIndex =
        shuffleOrder[0];


    mode =
        "shuffle";


    showCard();

};


// ======================================================
// DELETE WORD
// ======================================================

$("deleteWordButton").onclick = () => {

    if(!words.length)
        return;


    const word =
        words[currentIndex];


    const confirmed =
        confirm(
            `Delete “${word.word}”?` +
            `\n\n` +
            `This will remove the word from your vocabulary list.`
        );


    if(!confirmed)
        return;


    const deletedWord =
        word.word;


    words.splice(
        currentIndex,
        1
    );


    currentIndex =
        Math.min(
            currentIndex,

            Math.max(
                0,

                words.length - 1
            )
        );


    save();

    showCard();


    toast(
        "Thành công!",
        `Đã xóa từ: ${deletedWord}`
    );

};


// ======================================================
// MODAL
// ======================================================

function closeModal(id){

    $(id)
        .classList
        .add("hidden");

}


// ======================================================
// ADD WORD
// ======================================================

$("addWordButton").onclick = () => {

    $("addWordModal")
        .classList
        .remove("hidden");

    $("newWord").focus();

};


$("closeModal").onclick = () => {

    closeModal(
        "addWordModal"
    );

};


document
    .querySelector(
        "#addWordModal .modal-overlay"
    )
    .onclick = () => {

        closeModal(
            "addWordModal"
        );

    };


$("addWordForm").onsubmit = event => {

    event.preventDefault();


    const word = {

        id:
            Date.now(),

        word:
            $("newWord")
                .value
                .trim(),

        meaning:
            $("newMeaning")
                .value
                .trim(),

        example:
            $("newExample")
                .value
                .trim()
            ||
            "No example added yet.",

        type:
            $("newType")
                .value,

        status:
            "new",

        rating:
            null,

        reviews:
            0,

        nextReview:
            null,

        srsLevel:
            0,

        createdByUser:
            true,

        addedAt:
            Date.now()

    };


    if(
        !word.word ||
        !word.meaning
    ){

        return;

    }


    words.push(
        word
    );


    currentIndex =
        words.length - 1;


    save();


    $("addWordForm")
        .reset();


    closeModal(
        "addWordModal"
    );


    showCard();


    toast(
        "Thành công!",
        `Đã thêm từ: ${word.word}`
    );

};


// ======================================================
// STUDY PLAN
// ======================================================

$("studyPlanButton").onclick = () => {

    $("wordsPerDay").value =
        studyPlan.wordsPerDay;


    $("studyDays").value =
        studyPlan.days;


    updatePlanPreview();


    $("studyPlanModal")
        .classList
        .remove("hidden");

};


$("closeStudyPlan").onclick = () => {

    closeModal(
        "studyPlanModal"
    );

};


document
    .querySelector(
        "#studyPlanModal .modal-overlay"
    )
    .onclick = () => {

        closeModal(
            "studyPlanModal"
        );

};


function updatePlanPreview(){

    const daily =
        Number(
            $("wordsPerDay").value
        )
        ||
        0;


    const days =
        Number(
            $("studyDays").value
        )
        ||
        0;


    $("planTotal").textContent =
        `${daily * days} words`;

}


$("wordsPerDay").oninput =
    updatePlanPreview;


$("studyDays").oninput =
    updatePlanPreview;


$("saveStudyPlan").onclick = () => {

    studyPlan = {

        wordsPerDay:
            Math.max(
                1,

                Number(
                    $("wordsPerDay").value
                )
                ||
                1
            ),

        days:
            Math.max(
                1,

                Number(
                    $("studyDays").value
                )
                ||
                1
            ),

        startDate:
            studyPlan.startDate ||
            today()

    };


    save();


    closeModal(
        "studyPlanModal"
    );


    showCard();

};


// ======================================================
// QUIZ
// ======================================================

$("quizButton").onclick = () => {

    openQuiz();

};


$("closeQuiz").onclick = () => {

    closeModal(
        "quizModal"
    );

};


document
    .querySelector(
        "#quizModal .modal-overlay"
    )
    .onclick = () => {

        closeModal(
            "quizModal"
        );

};


function openQuiz(){

    if(!words.length)
        return;


    quizState = {

        score:0,

        total:0

    };


    $("quizModal")
        .classList
        .remove("hidden");


    quizQuestion();

}


function quizQuestion(){

    const word =
        words[
            Math.floor(
                Math.random()
                *
                words.length
            )
        ];


    const others =
        words
            .filter(
                item =>
                    item.id !==
                    word.id
            )
            .sort(
                () =>
                    Math.random() - .5
            )
            .slice(
                0,
                3
            );


    const options =
        [
            word,
            ...others
        ]
        .sort(
            () =>
                Math.random() - .5
        );


    quizState.total++;


    $("quizContent").innerHTML = `

        <div class="quiz-question">

            <span>
                What does this word mean?
            </span>

            <strong>
                ${escapeHTML(word.word)}
            </strong>

        </div>


        <div class="quiz-options">

            ${options
                .map(
                    option => `

                        <button
                            class="quiz-option"
                            data-id="${option.id}"
                        >
                            ${escapeHTML(
                                option.meaning
                            )}
                        </button>

                    `
                )
                .join("")}

        </div>


        <div class="quiz-result">

            Score:
            ${quizState.score}
            /
            ${quizState.total - 1}

        </div>

    `;


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            button => {

                button.onclick = () => {

                    const correct =
                        String(
                            button.dataset.id
                        )
                        ===
                        String(
                            word.id
                        );


                    button.style.borderColor =
                        correct
                            ? "#72b78d"
                            : "#e99a9a";


                    button.style.background =
                        correct
                            ? "#eefaf3"
                            : "#fff1f1";


                    if(correct){

                        quizState.score++;

                    }


                    setTimeout(
                        quizQuestion,
                        600
                    );

                };

            }
        );

}


// ======================================================
// SPEAKING
// ======================================================

const speakingPrompts = [

    "Describe a situation where you could use this expression.",

    "How could this expression be useful in your daily life?",

    "Give your opinion on a topic where this expression would fit naturally.",

    "Describe a recent experience and try to include this expression.",

    "Explain why this expression is useful for IELTS Speaking."

];


function setSpeakingPrompt(){

    const word =
        words[currentIndex];


    $("speakingTarget").textContent =
        word?.word ||
        "No word";


    $("speakingPrompt").textContent =
        speakingPrompts[
            Math.floor(
                Math.random()
                *
                speakingPrompts.length
            )
        ];


    $("speakingAnswer").value =
        "";

}


$("speakingButton").onclick = () => {

    $("speakingModal")
        .classList
        .remove("hidden");


    setSpeakingPrompt();

};


$("closeSpeaking").onclick = () => {

    closeModal(
        "speakingModal"
    );

};


$("newSpeakingPrompt").onclick =
    setSpeakingPrompt;


document
    .querySelector(
        "#speakingModal .modal-overlay"
    )
    .onclick = () => {

        closeModal(
            "speakingModal"
        );

};


// ======================================================
// SPEECH
// ======================================================

$("speakWord").onclick = () => {

    const text =
        words[currentIndex]?.word;


    if(
        text &&
        "speechSynthesis"
        in window
    ){

        speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(
                text
            );


        speech.lang =
            "en-US";


        speechSynthesis.speak(
            speech
        );

    }

};


// ======================================================
// THEME
// ======================================================

const themes = {

    purple:[
        "#7054d8",
        "#8e72ef"
    ],

    blue:[
        "#4285e5",
        "#69a4ff"
    ],

    green:[
        "#27a66b",
        "#55c98d"
    ],

    lime:[
        "#6dbb39",
        "#91d35d"
    ],

    orange:[
        "#ed8c20",
        "#ffb04d"
    ],

    red:[
        "#e74b55",
        "#ff747c"
    ],

    pink:[
        "#d94d9e",
        "#f079be"
    ],

    sunset:[
        "#9a4fd1",
        "#e76a77"
    ],

    dark:[
        "#3e4350",
        "#606778"
    ],

    gray:[
        "#858b99",
        "#aab0bb"
    ]

};


function applyTheme(name){

    const theme =
        themes[name]
        ||
        themes.purple;


    document.documentElement
        .style
        .setProperty(
            "--primary",
            theme[0]
        );


    document.documentElement
        .style
        .setProperty(
            "--primary2",
            theme[1]
        );


    document
        .querySelectorAll(
            ".swatch"
        )
        .forEach(
            swatch => {

                swatch.classList.toggle(
                    "active",

                    swatch.dataset.theme
                    ===
                    name
                );

            }
        );


    localStorage.setItem(
        THEME_KEY,
        name
    );


    $("themeSelect").value =
        themes[name]
            ? name
            : "purple";

}


document
    .querySelectorAll(
        ".swatch"
    )
    .forEach(
        swatch => {

            swatch.onclick = () => {

                applyTheme(
                    swatch.dataset.theme
                );

            };

        }
    );


$("themeSelect").onchange =
    event => {

        applyTheme(
            event.target.value
        );

    };


$("resetTheme").onclick =
    () => {

        applyTheme(
            "purple"
        );

    };


// ======================================================
// TOAST
// ======================================================

function toast(
    title,
    text
){

    $("toastTitle")
        .textContent =
        title;


    $("toastText")
        .textContent =
        text;


    $("toast")
        .classList
        .remove("hidden");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                $("toast")
                    .classList
                    .add("hidden");

            },

            3000
        );

}


$("closeToast").onclick =
    () => {

        $("toast")
            .classList
            .add("hidden");

    };


// ======================================================
// KEYBOARD
// ======================================================

document.addEventListener(
    "keydown",

    event => {

        const modalOpen =
            [
                ...document
                    .querySelectorAll(
                        ".modal"
                    )
            ]
            .some(
                modal =>
                    !modal
                        .classList
                        .contains(
                            "hidden"
                        )
            );


        if(modalOpen)
            return;


        if(
            event.code ===
            "Space"
            &&
            elements.answer.style.display
            !==
            "block"
        ){

            event.preventDefault();

            elements.show.click();

        }


        if(
            event.key ===
            "ArrowRight"
        ){

            $("next").click();

        }


        if(
            event.key ===
            "ArrowLeft"
        ){

            $("previous").click();

        }

    }

);


// ======================================================
// INITIALIZE
// ======================================================

applyTheme(
    localStorage.getItem(
        THEME_KEY
    )
    ||
    "purple"
);


save();

showCard();