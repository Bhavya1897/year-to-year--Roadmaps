/*
 * Main JavaScript file for the roadmap website.
 *
 * data.js contains the course information.
 * This file handles pages, quizzes, login and progress tracking.
 */

let currentUser = "";
let progressKey = "rm";
let savedProgress = {};

const BTECH_COUNT = 16;

function getElement(selector) {
    return document.querySelector(selector);
}

const app = getElement("#app");

function loadProgress() {
    try {
        savedProgress = JSON.parse(
            localStorage.getItem(progressKey) || "{}"
        );
    } catch (error) {
        savedProgress = {};
    }
}

function escapeHtml(text) {
    const characters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return text.replace(/[&<>"']/g, character => characters[character]);
}

function getYearCount(courseIndex) {
    return B[courseIndex].length - 3;
}

function getYears(courseIndex) {
    return Array.from(
        { length: getYearCount(courseIndex) },
        (_, index) => index
    );
}

function getTasks(courseIndex, yearIndex) {
    const course = B[courseIndex];
    const yearTasks = course[3 + yearIndex].split("|");
    const lastYear = yearIndex === getYearCount(courseIndex) - 1;

    if (lastYear) {
        yearTasks.push(
            courseIndex < BTECH_COUNT
                ? C[3]
                : "Decide your path: job, higher studies or exams"
        );
    } else {
        yearTasks.push(C[Math.min(yearIndex, 2)]);
    }

    return yearTasks;
}

function getProgressKeys(courseIndex) {
    const progressKeys = [];

    getYears(courseIndex).forEach(yearIndex => {
        getTasks(courseIndex, yearIndex).forEach((task, taskIndex) => {
            progressKeys.push(
                courseIndex + "-" + yearIndex + "-" + taskIndex
            );
        });
    });

    return progressKeys;
}

function getProgressPercent(courseIndex) {
    const progressKeys = getProgressKeys(courseIndex);
    const completed = progressKeys.filter(key => savedProgress[key]).length;

    if (progressKeys.length === 0) {
        return 0;
    }

    return Math.round((completed / progressKeys.length) * 100);
}

function goToTop() {
    window.scrollTo(0, 0);
}

// ------------------------------------------------------------
// Home page
// ------------------------------------------------------------

function showHome() {
    app.innerHTML = `
        <div class="hero">
            <h1>🎓 B.Tech and Degree Roadmaps</h1>
            <p>Choose what you are studying to see your year-by-year plan.</p>
        </div>

        <h2>What are you studying?</h2>

        <div class="grid big">
            <button class="card" style="--card-color:#6366f1" onclick="showBranches()">
                <span class="ic">⚙️</span>
                <b>B.Tech / B.E.</b>
                <small>Engineering · 16 branches</small>
            </button>

            <button class="card" style="--card-color:#10b981" onclick="showDegrees()">
                <span class="ic">🎓</span>
                <b>Degree Courses</b>
                <small>B.Sc, BCA, B.Arch, B.Pharm, B.Com and more</small>
            </button>

            <button class="card" style="--card-color:#ec4899" onclick="startDegreeQuiz()">
                <span class="ic">🧭</span>
                <b>Find my course</b>
                <small>Take a quick quiz to see what suits you</small>
            </button>
        </div>
    `;

    goToTop();
}

// ------------------------------------------------------------
// Degree pages
// ------------------------------------------------------------

function showDegrees() {
    let html = `
        <button class="back" onclick="showHome()">&larr; Back</button>

        <div class="hero">
            <h1>🎓 Degree Courses</h1>
            <p>Choose your degree to see its roadmap.</p>
        </div>

        <div class="tools">
            <input
                id="q"
                placeholder="🔍 Search a degree (BCA, B.Pharm...)"
                oninput="filterCards(this.value)"
            >
        </div>

        <h2>Pick your degree</h2>
        <div class="grid">
    `;

    CO.forEach((course, index) => {
        if (index === 0) {
            return;
        }

        html += `
            <button
                class="card"
                style="--card-color:${course[3]}"
                onclick="openDegreeChoice(${index})"
            >
                <span class="ic">${course[1]}</span>
                <b>${course[0]}</b>
                <small>${course[2]}</small>
            </button>
        `;
    });

    html += `</div>`;

    app.innerHTML = html;
    goToTop();
}

function openDegreeChoice(index) {
    const courseIndex = CO[index][4];

    if (courseIndex === -1) {
        showBranches();
    } else if (courseIndex === -2) {
        showDegreeSubjects(index);
    } else {
        showRoadmap(courseIndex);
    }
}

function showDegreeSubjects(index) {
    const course = CO[index];

    let html = `
        <button class="back" onclick="showDegrees()">&larr; All degrees</button>

        <div class="hero">
            <h1>${course[1]} ${course[0]}</h1>
            <p>Pick your subject to see its roadmap.</p>
        </div>

        <h2>Choose your subject</h2>
        <div class="grid">
    `;

    course[5].forEach(courseIndex => {
        html += `
            <button
                class="card"
                style="--card-color:${course[3]}"
                onclick="showRoadmap(${courseIndex})"
            >
                <span class="ic">${IC[courseIndex]}</span>
                <b>${B[courseIndex][0]}</b>
                <small>${getProgressPercent(courseIndex)}% done</small>
            </button>
        `;
    });

    html += `</div>`;

    app.innerHTML = html;
    goToTop();
}

// ------------------------------------------------------------
// Degree quiz
// ------------------------------------------------------------

const degreeQuizQuestions = [
    [
        "What do you enjoy most?",
        [
            ["Coding and building apps", [0, 7, 17, 18, 4]],
            ["Data, numbers and patterns", [2, 19, 27, 29, 1, 20]],
            ["Designing and creating things", [21, 23, 22, 13]],
            ["Machines, electronics and gadgets", [10, 8, 9, 5, 13, 14]],
            ["Science experiments", [25, 26, 28, 12, 15, 24]],
            ["People, business and money", [30, 29, 31]]
        ]
    ],
    [
        "Which subjects do you like?",
        [
            ["Maths and logic", [0, 1, 2, 19, 27, 20, 9, 8]],
            ["Physics", [25, 8, 9, 10, 14, 11]],
            ["Chemistry and biology", [26, 28, 24, 15, 12]],
            ["Drawing and art", [21, 23, 22]],
            ["Languages, history and society", [31, 30, 22]],
            ["Accounts and economics", [29, 30]]
        ]
    ],
    [
        "How do you like to work?",
        [
            ["On a laptop", [0, 1, 2, 3, 4, 7, 17, 18, 19, 20]],
            ["Hands-on with tools and hardware", [10, 8, 9, 5, 13, 14]],
            ["In a lab", [25, 26, 28, 24, 15, 12, 16]],
            ["In a design studio", [21, 23, 22]],
            ["On site or in the field", [11, 22, 10]],
            ["With people, in teams and meetings", [30, 29, 31]]
        ]
    ],
    [
        "What is your dream career?",
        [
            ["Software or AI job at a tech company", [0, 1, 7, 17, 18, 20, 3]],
            ["Scientist, researcher or professor", [25, 26, 27, 28, 16, 15]],
            ["Architect, designer or planner", [21, 23, 22]],
            ["Pharmacy or healthcare industry", [24, 28, 15]],
            ["Business, finance or manager", [29, 30]],
            ["Government job or civil services", [31, 11, 9, 16, 29]]
        ]
    ],
    [
        "How long are you ready to study?",
        [
            ["3 years (quicker start)", [16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 31]],
            ["4 years", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 22, 23, 24]],
            ["5 years (e.g. architecture)", [21]],
            ["Not sure yet", []]
        ]
    ],
    [
        "What matters most to you?",
        [
            ["A high salary in tech", [0, 1, 2, 3, 4, 17, 18, 19, 20]],
            ["A stable job", [9, 11, 31, 24, 29]],
            ["Creativity", [21, 23]],
            ["Higher studies and research", [25, 26, 27, 28, 15]],
            ["Starting my own business", [30, 29, 6, 0]]
        ]
    ]
];

let degreeQuizAnswers = [];
let degreeQuizIndex = 0;

function startDegreeQuiz() {
    degreeQuizAnswers = [];
    degreeQuizIndex = 0;
    showDegreeQuizQuestion();
}

function showDegreeQuizQuestion() {
    if (degreeQuizIndex >= degreeQuizQuestions.length) {
        showDegreeQuizResult();
        return;
    }

    const question = degreeQuizQuestions[degreeQuizIndex];

    let html = `
        <button class="back" onclick="showHome()">&larr; Back</button>

        <div class="hero">
            <h1>🧭 Find my course</h1>
            <p>Question ${degreeQuizIndex + 1} of ${degreeQuizQuestions.length}</p>
            <div class="bar">
                <i style="width:${Math.round(100 * degreeQuizIndex / degreeQuizQuestions.length)}%"></i>
            </div>
        </div>

        <h2>${question[0]}</h2>
        <div class="grid">
    `;

    question[1].forEach((option, index) => {
        html += `
            <button
                class="card"
                style="--card-color:#ec4899"
                onclick="chooseDegreeQuizAnswer(${index})"
            >
                <b>${option[0]}</b>
            </button>
        `;
    });

    html += `</div>`;

    app.innerHTML = html;
    goToTop();
}

function chooseDegreeQuizAnswer(index) {
    degreeQuizAnswers.push(
        degreeQuizQuestions[degreeQuizIndex][1][index][1]
    );

    degreeQuizIndex++;
    showDegreeQuizQuestion();
}

function showDegreeQuizResult() {
    const scores = {};

    degreeQuizAnswers.flat().forEach(courseIndex => {
        scores[courseIndex] = (scores[courseIndex] || 0) + 1;
    });

    const topCourses = Object.keys(scores)
        .map(Number)
        .sort((a, b) => scores[b] - scores[a] || a - b)
        .slice(0, 3);

    let html = `
        <button class="back" onclick="showHome()">&larr; Back</button>

        <div class="hero">
            <h1>🎯 Courses that suit you</h1>
            <p>Based on your answers. Open one to see its full roadmap.</p>
        </div>

        <div class="grid" style="margin-top:16px">
    `;

    topCourses.forEach(courseIndex => {
        const courseType = courseIndex < BTECH_COUNT ? "B.Tech / B.E." : "Degree";
        const match = Math.round(100 * scores[courseIndex] / degreeQuizQuestions.length);

        html += `
            <button
                class="card"
                style="--card-color:${GC[B[courseIndex][1]]}"
                onclick="showRoadmap(${courseIndex})"
            >
                <span class="ic">${IC[courseIndex]}</span>
                <b>${B[courseIndex][0]}</b>
                <small>${courseType} · ${match}% match</small>
            </button>
        `;
    });

    html += `
        </div>
        <p>
            <button class="back" onclick="startDegreeQuiz()">
                🔁 Retake quiz
            </button>
        </p>
    `;

    app.innerHTML = html;
    goToTop();
}

// ------------------------------------------------------------
// B.Tech branches
// ------------------------------------------------------------

function showBranches() {
    let html = `
        <button class="back" onclick="showHome()">&larr; Back</button>

        <div class="hero">
            <h1>⚙️ B.Tech / B.E. Branches</h1>
            <p>Pick your branch and follow a clear, year-by-year plan all the way to your first job.</p>
        </div>

        <div class="tools">
            <input
                id="q"
                placeholder="🔍 Search a branch (AI, Civil, ECE...)"
                oninput="filterCards(this.value)"
            >
            <button class="back" onclick="startBranchQuiz()">
                🧭 Not sure? Find my branch
            </button>
        </div>
    `;

    G.forEach((group, groupIndex) => {
        html += `
            <h2 style="color:${GC[groupIndex]}">${group}</h2>
            <div class="grid">
        `;

        B.forEach((branch, branchIndex) => {
            if (branch[1] !== groupIndex || branchIndex >= BTECH_COUNT) {
                return;
            }

            html += `
                <button
                    class="card"
                    style="--card-color:${GC[groupIndex]}"
                    onclick="showRoadmap(${branchIndex})"
                >
                    <span class="ic">${IC[branchIndex]}</span>
                    <b>${branch[0]}</b>
                    <small>${getProgressPercent(branchIndex)}% done</small>
                </button>
            `;
        });

        html += `</div>`;
    });

    app.innerHTML = html;
    goToTop();
}

function showRoadmap(courseIndex) {
    const course = B[courseIndex];
    const backFunction = courseIndex < BTECH_COUNT
        ? "showBranches()"
        : SC.includes(courseIndex)
            ? "showDegreeSubjects(1)"
            : "showDegrees()";

    const backText = courseIndex < BTECH_COUNT
        ? "All branches"
        : SC.includes(courseIndex)
            ? "All subjects"
            : "All degrees";

    let html = `
        <button class="back" onclick="${backFunction}">
            &larr; ${backText}
        </button>

        <div class="hero" style="--hero-color:${GC[course[1]]}">
            <h1>${IC[courseIndex]} ${course[0]} roadmap</h1>
            <p>Tick off each step as you complete it.</p>

            <div class="bar">
                <i id="f"></i>
            </div>
            <small id="p"></small>
        </div>
    `;

    getYears(courseIndex).forEach(yearIndex => {
        const isLastYear = yearIndex === getYearCount(courseIndex) - 1;
        const yearColor = isLastYear ? "#10b981" : YC[yearIndex];

        html += `
            <section style="--year-color:${yearColor}">
                <h3>
                    <b class="bd">${yearIndex + 1}</b>
                    Year ${yearIndex + 1}
                    <span>${TT(getYearCount(courseIndex), yearIndex)}</span>
                </h3>
        `;

        getTasks(courseIndex, yearIndex).forEach((task, taskIndex) => {
            const progressId = `${courseIndex}-${yearIndex}-${taskIndex}`;
            const checked = savedProgress[progressId] ? "checked" : "";

            html += `
                <label>
                    <input
                        type="checkbox"
                        ${checked}
                        onchange="updateTask('${progressId}', ${courseIndex}, this.checked)"
                    >
                    <span>${task}</span>
                </label>
            `;
        });

        html += `</section>`;
    });

    html += `
        <h2>💼 Job roles you can aim for</h2>
        <div class="chips" style="--c:#6366f1">
    `;

    course[2].split(" · ").forEach(role => {
        html += `<span>${role}</span>`;
    });

    html += `
        </div>
        <h2>🚀 Your exit options after B.Tech</h2>
        <div class="chips" style="--c:#ec4899">
    `;

    (courseIndex < BTECH_COUNT ? E : E2).forEach(option => {
        html += `<span>${option}</span>`;
    });

    html += `
        </div>
        <h2>📚 Free resources to start</h2>
        <div class="chips" style="--c:#10b981">
    `;

    R[course[1]].forEach(resource => {
        html += `
            <a href="${resource[1]}" target="_blank" rel="noopener">
                ${resource[0]}
            </a>
        `;
    });

    html += `
        </div>
        <p>
            <button class="back" id="sh" onclick="copyProgress(${courseIndex})">
                📋 Copy my progress
            </button>
        </p>
    `;

    app.innerHTML = html;
    updateProgress(courseIndex);
    goToTop();
}

// ------------------------------------------------------------
// Branch quiz
// ------------------------------------------------------------

const branchQuizQuestions = [
    [
        "What excites you most?",
        [
            ["Building apps and websites", [0, 7, 4]],
            ["AI, data and smart predictions", [1, 2]],
            ["Circuits, chips and gadgets", [8, 9, 5]],
            ["Machines, vehicles and flight", [10, 13, 14]],
            ["Buildings, plants and industry", [11, 12]],
            ["Life sciences and research", [15]]
        ]
    ],
    [
        "How do you like to work?",
        [
            ["On a laptop, writing code", [0, 1, 2, 3, 4, 6, 7]],
            ["With hardware in a lab", [5, 8, 9, 13]],
            ["On-site in the field", [10, 11, 12]],
            ["Doing experiments", [12, 15]]
        ]
    ],
    [
        "Favourite subject?",
        [
            ["Maths and logic", [0, 1, 2, 14]],
            ["Physics", [8, 9, 10, 13, 14]],
            ["Chemistry and biology", [12, 15]],
            ["Computers and the internet", [0, 3, 4, 6, 7]]
        ]
    ],
    [
        "Dream goal?",
        [
            ["A software job at a product company", [0, 7, 1]],
            ["Protecting systems from hackers", [3]],
            ["ISRO, PSU or core industry", [8, 9, 10, 11, 14]],
            ["Research and higher studies", [15, 1, 2]],
            ["Building gadgets and EVs", [5, 13, 9]]
        ]
    ]
];

let branchQuizAnswers = [];
let branchQuizIndex = 0;

function filterCards(value) {
    const searchText = value.toLowerCase();
    const cards = document.querySelectorAll(".grid .card");

    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        card.style.display = cardText.includes(searchText) ? "" : "none";
    });
}

function startBranchQuiz() {
    branchQuizAnswers = [];
    branchQuizIndex = 0;
    showBranchQuizQuestion();
}

function showBranchQuizQuestion() {
    if (branchQuizIndex >= branchQuizQuestions.length) {
        showBranchQuizResult();
        return;
    }

    const question = branchQuizQuestions[branchQuizIndex];

    let html = `
        <button class="back" onclick="showBranches()">&larr; Back</button>

        <div class="hero">
            <h1>🧭 Find my branch</h1>
            <p>Question ${branchQuizIndex + 1} of ${branchQuizQuestions.length}</p>
        </div>

        <h2>${question[0]}</h2>
        <div class="grid">
    `;

    question[1].forEach((option, index) => {
        html += `
            <button
                class="card"
                style="--card-color:#6366f1"
                onclick="chooseBranchQuizAnswer(${index})"
            >
                <b>${option[0]}</b>
            </button>
        `;
    });

    html += `</div>`;

    app.innerHTML = html;
    goToTop();
}

function chooseBranchQuizAnswer(index) {
    branchQuizAnswers.push(
        branchQuizQuestions[branchQuizIndex][1][index][1]
    );

    branchQuizIndex++;
    showBranchQuizQuestion();
}

function showBranchQuizResult() {
    const scores = {};

    branchQuizAnswers.flat().forEach(courseIndex => {
        scores[courseIndex] = (scores[courseIndex] || 0) + 1;
    });

    const topBranches = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 3);

    let html = `
        <button class="back" onclick="showBranches()">&larr; All branches</button>

        <div class="hero">
            <h1>🎯 Your top matches</h1>
            <p>Open one to see its full roadmap.</p>
        </div>

        <div class="grid" style="margin-top:16px">
    `;

    topBranches.forEach(index => {
        html += `
            <button
                class="card"
                style="--card-color:${GC[B[index][1]]}"
                onclick="showRoadmap(${index})"
            >
                <span class="ic">${IC[index]}</span>
                <b>${B[index][0]}</b>
                <small>View roadmap</small>
            </button>
        `;
    });

    html += `
        </div>
        <p>
            <button class="back" onclick="startBranchQuiz()">
                🔁 Retake quiz
            </button>
        </p>
    `;

    app.innerHTML = html;
    goToTop();
}

// ------------------------------------------------------------
// Progress and login
// ------------------------------------------------------------

function copyProgress(courseIndex) {
    const progressText =
        "I am " +
        getProgressPercent(courseIndex) +
        "% through the " +
        B[courseIndex][0] +
        " roadmap 🎓 " +
        location.href;

    const button = getElement("#sh");

    try {
        navigator.clipboard
            .writeText(progressText)
            .then(() => {
                button.textContent = "✅ Copied!";
            })
            .catch(() => {
                button.textContent = "Copy is blocked here";
            });
    } catch (error) {
        button.textContent = "Copy is blocked here";
    }
}

function updateTask(key, courseIndex, value) {
    savedProgress[key] = value;

    try {
        localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    } catch (error) {
        // Local storage may be unavailable in some browser modes.
    }

    updateProgress(courseIndex);
}

function updateProgress(courseIndex) {
    const percent = getProgressPercent(courseIndex);
    const progressBar = getElement("#f");
    const progressText = getElement("#p");

    if (progressBar) {
        progressBar.style.width = percent + "%";
    }

    if (progressText) {
        progressText.textContent = percent === 100
            ? "🎉 Roadmap complete! You are job-ready!"
            : percent + "% complete";
    }
}

function updateLoginBar() {
    const authBar = getElement("#auth");

    authBar.innerHTML = currentUser
        ? `
            <span>👋 ${escapeHtml(currentUser)}</span>
            <button class="back" onclick="logOut()">Log out</button>
        `
        : "";
}

function showLogin() {
    app.innerHTML = `
        <div class="login">
            <div class="hero" style="border-radius:0;margin:0;box-shadow:none">
                <h1>🎓 B.Tech and Degree Roadmaps</h1>
                <p>Your step-by-step path from first year to first job</p>
            </div>

            <div class="in">
                <h2 style="margin:0 0 6px">Welcome, student! 👋</h2>
                <p class="sub">Log in to open your personal roadmap.</p>

                <div class="fm">
                    <input
                        id="un"
                        placeholder="👤 Username"
                        autocomplete="username"
                    >
                    <input
                        id="pw"
                        type="password"
                        placeholder="🔒 Password"
                        autocomplete="current-password"
                        onkeydown="if(event.key === 'Enter') handleLogin()"
                    >
                    <button class="pbtn" onclick="handleLogin()">Login</button>
                </div>

                <ul>
                    <li>🎓 32 roadmaps across 13 degree courses</li>
                    <li>✅ Track your progress year by year</li>
                    <li>💾 Your progress is saved for your username</li>
                </ul>
            </div>
        </div>
    `;

    updateLoginBar();
    goToTop();
}

function loginUser(username) {
    currentUser = username;
    progressKey = "rm_" + username.toLowerCase();

    loadProgress();
    updateLoginBar();
    showHome();
}

function handleLogin() {
    const username = getElement("#un").value.trim();
    const password = getElement("#pw").value;

    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    try {
        localStorage.setItem("rmuser", username);
    } catch (error) {
        // Continue even if local storage is unavailable.
    }

    loginUser(username);
}

function logOut() {
    try {
        localStorage.removeItem("rmuser");
    } catch (error) {
        // Continue logging out even if local storage is unavailable.
    }

    currentUser = "";
    progressKey = "rm";
    showLogin();
}

// Start the website.
let savedUser = "";

try {
    savedUser = localStorage.getItem("rmuser") || "";
} catch (error) {
    savedUser = "";
}

if (savedUser) {
    loginUser(savedUser);
} else {
    showLogin();
}
