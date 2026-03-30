const API_BASE = "";
const DAY_KEYS = ["day1", "day2", "day3", "day4"];

const DAY_LABELS = {
  uk: { day1: "DAY 1 (01.04)", day2: "DAY 2 (02.04)", day3: "DAY 3 (03.04)", day4: "DAY 4 (04.04)" },
  en: { day1: "DAY 1 (01.04)", day2: "DAY 2 (02.04)", day3: "DAY 3 (03.04)", day4: "DAY 4 (04.04)" }
};

const SYMBOLS = ["π", "√", "≈", "≠", "≤", "≥", "∞", "∑", "Δ", "°", "×", "÷", "^", "(", ")", "[", "]", "{", "}"];

const I18N = {
  uk: {
    pageTitle: "Matclub Edition",
    authTitle: "Matclub Edition",
    authSubtitle: "Увійдіть або створіть акаунт, щоб розв'язувати задачі щодня.",
    tabLogin: "Вхід",
    tabRegister: "Реєстрація",
    loginEmailPlaceholder: "Ваш email",
    loginPasswordPlaceholder: "Пароль",
    loginSubmit: "Увійти",
    registerNamePlaceholder: "Ім'я",
    registerEmailPlaceholder: "Ваш email",
    registerAgePlaceholder: "Вік",
    registerPlacePlaceholder: "Місце навчання",
    registerPasswordPlaceholder: "Пароль",
    registerSubmit: "Зареєструватися",
    pointsHeaderLabel: "Загальні бали",
    tasksDescription: "Щодня доступно 2 задачі. За вирішення найкращої ти отримаєш бали. Інша — для тренування!",
    pointsLabel: "Бали акаунту",
    accuracyLabel: "Середня правильність",
    weekTitle: "Статистика задач по днях",
    leaderboardTitle: "Таблиця рейтингу",
    showLeaderboard: "Показати",
    hideLeaderboard: "Сховати",
    lbPlace: "Місце",
    lbName: "Ім'я",
    lbPoints: "Бали",
    lbAccuracy: "Точність",
    noLeaderboardData: "Ще немає даних рейтингу",
    adminTitle: "Адмін журнал",
    adminColTime: "Час",
    adminColUser: "Користувач",
    adminColTask: "Задача",
    adminColPoints: "Бали",
    adminColAnswer: "Відповідь",
    noAdminData: "Поки немає виконаних задач",
    settingsTitle: "Налаштування",
    settingsQuestion: "Що зробити?",
    languageLabel: "Мова",
    changeLanguage: "Змінити мову",
    back: "Повернутись назад",
    deleteAccount: "Видалити акаунт",
    deleteConfirm: "Точно видалити акаунт? Цю дію не можна скасувати.",
    deleteSuccess: "Акаунт видалено",
    deleteAdminBlocked: "Адмін-акаунт видаляти не можна",
    logout: "Вийти з акаунту",
    adminInfoOn: "Режим адміна активний. Нижче доступний журнал дій користувачів.",
    adminInfoOff: "Для адмін-перегляду увійдіть з email, що містить admin.",
    langUk: "Українська",
    langEn: "English",
    welcomePrefix: "Привіт",
    ageWord: "Вік",
    placeWord: "Місце навчання",
    todayPrefix: "Сьогодні",
    pointsWord: "балів",
    accuracyWord: "Правильність",
    done: "Виконано",
    chooseTask: "Відкрити задачу",
    noTask: "нема виконаної задачі",
    updated: "Оновлено",
    fillAll: "Заповніть всі поля",
    registerSuccess: "Реєстрація успішна",
    registerFirst: "Спочатку зареєструйтесь",
    emailExists: "Такий email вже зареєстрований",
    emailReserved: "Ця пошта зарезервована для адміністратора",
    invalidCreds: "Невірний email або пароль",
    logoutSuccess: "Ви вийшли з акаунту",
    taskModalTitle: "Умова задачі",
    answerLabel: "Відповідь",
    answerPlaceholder: "Введіть відповідь...",
    symbolsLabel: "Математичні символи:",
    submitAnswer: "Надіслати відповідь",
    cancelTask: "Скасувати",
    addBtn: "Створити задачу",
    addTaskTitle: "Створити задачу",
    taskSaved: "Задачу збережено!",
    saveBtn: "Зберегти",
    toggleTasksBtnOpen: "Відкрити задачі для всіх",
    toggleTasksBtnClose: "Закрити задачі",
    tasksOpenSuccess: "Налаштування оновлено!",
    answerCorrect: "Правильно!",
    answerWrong: "Неправильно!",
    alreadySolved: "Ви вже вирішили цю задачу. Подальші відповіді не приймаються.",
    answerRequired: "Введіть відповідь",
    leaderboardSearchPlaceholder: "Пошук за іменем або місцем навчання..."
  },
  en: {
    pageTitle: "Matclub Edition",
    authTitle: "Matclub Edition",
    authSubtitle: "Sign in or create your account to start solving daily tasks.",
    tabLogin: "Login",
    tabRegister: "Sign up",
    loginEmailPlaceholder: "Your email",
    loginPasswordPlaceholder: "Password",
    loginSubmit: "Log in",
    registerNamePlaceholder: "Name",
    registerEmailPlaceholder: "Your email",
    registerAgePlaceholder: "Age",
    registerPlacePlaceholder: "Place of study",
    registerPasswordPlaceholder: "Password",
    registerSubmit: "Create account",
    pointsHeaderLabel: "Total points",
    tasksDescription: "Each day you get 2 tasks. Solve the best one for points — the other is for practice!",
    pointsLabel: "Account points",
    accuracyLabel: "Average accuracy",
    weekTitle: "Task stats by day",
    leaderboardTitle: "Leaderboard",
    showLeaderboard: "Show",
    hideLeaderboard: "Hide",
    lbPlace: "Place",
    lbName: "Name",
    lbPoints: "Points",
    lbAccuracy: "Accuracy",
    noLeaderboardData: "No leaderboard data yet",
    adminTitle: "Admin Log",
    adminColTime: "Time",
    adminColUser: "User",
    adminColTask: "Task",
    adminColPoints: "Points",
    adminColAnswer: "Answer",
    noAdminData: "No completed tasks yet",
    settingsTitle: "Settings",
    settingsQuestion: "What do you want to do?",
    languageLabel: "Language",
    changeLanguage: "Change language",
    back: "Go back",
    deleteAccount: "Delete account",
    deleteConfirm: "Delete this account? This action cannot be undone.",
    deleteSuccess: "Account deleted",
    deleteAdminBlocked: "Admin account cannot be deleted",
    logout: "Log out",
    adminInfoOn: "Admin mode is active. User activity log is available below.",
    adminInfoOff: "Use an email containing 'admin' to access admin log.",
    langUk: "Українська",
    langEn: "English",
    welcomePrefix: "Hello",
    ageWord: "Age",
    placeWord: "Place of study",
    todayPrefix: "Today",
    pointsWord: "points",
    accuracyWord: "Accuracy",
    done: "Done",
    chooseTask: "Open task",
    noTask: "no completed task",
    updated: "Updated",
    fillAll: "Fill in all fields",
    registerSuccess: "Registration successful",
    registerFirst: "Please sign up first",
    emailExists: "This email is already registered",
    emailReserved: "This email is reserved for admin",
    invalidCreds: "Invalid email or password",
    logoutSuccess: "You logged out",
    taskModalTitle: "Task condition",
    answerLabel: "Answer",
    answerPlaceholder: "Type your answer...",
    symbolsLabel: "Math symbols:",
    submitAnswer: "Submit answer",
    cancelTask: "Cancel",
    addBtn: "Create task",
    addTaskTitle: "Create task",
    taskSaved: "Task saved!",
    saveBtn: "Save",
    toggleTasksBtnOpen: "Open tasks for all",
    toggleTasksBtnClose: "Close tasks",
    tasksOpenSuccess: "Settings updated!",
    answerCorrect: "Correct!",
    answerWrong: "Wrong answer!",
    alreadySolved: "You already solved this task. No further submissions allowed.",
    answerRequired: "Enter an answer",
    leaderboardSearchPlaceholder: "Search by name or place of study..."
  }
};

const showLoginBtn = document.getElementById("show-login");
const showRegisterBtn = document.getElementById("show-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const message = document.getElementById("message");
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const settingsButton = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const backButton = document.getElementById("back-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const logoutButton = document.getElementById("logout-button");
const languageSelect = document.getElementById("language-select");
const saveLanguageButton = document.getElementById("save-language-button");

const authTitle = document.querySelector(".auth-title");
const authSubtitle = document.querySelector(".auth-subtitle");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginSubmitButton = loginForm.querySelector("button[type='submit']");
const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerAge = document.getElementById("register-age");
const registerPlace = document.getElementById("register-place");
const registerPassword = document.getElementById("register-password");
const registerSubmitButton = registerForm.querySelector("button[type='submit']");

const welcomeTitle = document.getElementById("welcome-title");
const userMeta = document.getElementById("user-meta");
const dayLabel = document.getElementById("day-label");
const tasksList = document.getElementById("tasks-list");
const pointsValue = document.getElementById("points-value");
const accuracyValue = document.getElementById("accuracy-value");
const totalRating = document.getElementById("total-rating");
const pointsHeaderLabel = document.getElementById("points-header-label");
const ratingUpdated = document.getElementById("rating-updated");
const tasksDescription = document.getElementById("tasks-description");
const pointsLabel = document.getElementById("points-label");
const accuracyLabel = document.getElementById("accuracy-label");
const weekTitle = document.getElementById("week-title");
const weekStats = document.getElementById("week-stats");

const leaderboardTitle = document.getElementById("leaderboard-title");
const leaderboardSearchInput = document.getElementById("leaderboard-search");
const toggleLeaderboardButton = document.getElementById("toggle-leaderboard-button");
const leaderboardWrap = document.getElementById("leaderboard-wrap");
const leaderboardBody = document.getElementById("leaderboard-body");
const lbColPlace = document.getElementById("lb-col-place");
const lbColName = document.getElementById("lb-col-name");
const lbColPoints = document.getElementById("lb-col-points");
const lbColAccuracy = document.getElementById("lb-col-accuracy");

const adminSection = document.getElementById("admin-section");
const adminTitle = document.getElementById("admin-title");
const adminLogBody = document.getElementById("admin-log-body");
const adminColTime = document.getElementById("admin-col-time");
const adminColUser = document.getElementById("admin-col-user");
const adminColTask = document.getElementById("admin-col-task");
const adminColPoints = document.getElementById("admin-col-points");
const adminColAnswer = document.getElementById("admin-col-answer");

const settingsTitle = document.getElementById("settings-title");
const settingsQuestion = document.getElementById("settings-question");
const languageLabel = document.getElementById("language-label");
const adminInfo = document.getElementById("admin-info");

const taskModal = document.getElementById("task-modal");
const taskModalTitle = document.getElementById("task-modal-title");
const taskModalCondition = document.getElementById("task-modal-condition");
const answerLabel = document.getElementById("answer-label");
const taskAnswer = document.getElementById("task-answer");
const symbolsLabel = document.getElementById("symbols-label");
const mathSymbols = document.getElementById("math-symbols");
const submitAnswerButton = document.getElementById("submit-answer-button");
const cancelTaskButton = document.getElementById("cancel-task-button");

const adminContent = document.getElementById("admin-content");
const tasksContainer = document.getElementById("tasks-container");
const btnAddNew = document.getElementById("btn-add-new");
const btnPrevDay = document.getElementById("prev-day-btn");
const btnNextDay = document.getElementById("next-day-btn");

const btnOpenAddTask = document.getElementById("btn-open-add-task");
const btnToggleTasks = document.getElementById("btn-toggle-tasks");

const taskModalImage = document.getElementById("task-modal-image");

let serverConfig = { tasks_open: false, custom_tasks: [] };

function getLogicalToday() {
  const d = new Date();
  if (d.getHours() < 13) {
    d.setDate(d.getDate() - 1); // Before 13:00 still counts as yesterday
  }
  return d;
}

let activeViewingDate = getLogicalToday();

let currentLang = getStorage("matclub_lang", "uk");
let sessionUser = getStorage("matclub_session_user", null);
let sessionToken = getStorage("matclub_session_token", null);
let clockTimer = null;
let isLeaderboardOpen = false;
let activeTask = null;
let cachedLeaderboardRows = [];
let lastUserSubmissions = [];

function t(key) {
  return I18N[currentLang][key] || I18N.uk[key] || key;
}

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isSubmissionCorrectForTask(task, submission) {
  if (!submission) return false;
  const expected = task.answers;
  const userAnswer = (submission.answer || "").trim().toLowerCase();
  if (expected && expected.trim() !== "") {
    const list = expected.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
    if (list.length > 0) return list.includes(userAnswer);
  }
  return submission.points > 0;
}

function getStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function authHeaders() {
  if (!sessionToken) return {};
  return { Authorization: `Basic ${sessionToken}` };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Request failed");
  }

  return response.json();
}

function isAdmin(user) {
  return Boolean(user && user.is_admin);
}

function getCompetitionDayIndex(d) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (m === 4) {
    if (day === 1) return 0;
    if (day === 2) return 1;
    if (day === 3) return 2;
    if (day === 4) return 3;
  }
  // If outside range (for testing or before start), bound to nearest day or 0
  if (m < 4 || (m === 4 && day < 1)) return 0;
  return 3;
}

function getTodayIndex() {
  return getCompetitionDayIndex(getLogicalToday());
}

function getTodayKey() {
  return DAY_KEYS[getTodayIndex()];
}

function getDateKey(d = null) {
  d = d || getLogicalToday();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const d_str = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${d_str}`;
}

function hashString(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createRng(seed) {
  let tSeed = seed;
  return () => {
    tSeed += 0x6d2b79f5;
    let r = Math.imul(tSeed ^ (tSeed >>> 15), 1 | tSeed);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function formatDay(dayKey) {
  return DAY_LABELS[currentLang][dayKey];
}

function switchTo(mode) {
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  loginForm.classList.toggle("active", isLogin);
  registerForm.classList.toggle("active", isRegister);
  showLoginBtn.classList.toggle("active", isLogin);
  showRegisterBtn.classList.toggle("active", isRegister);
  showMessage("");
}

function openSettings() {
  languageSelect.value = currentLang;
  settingsModal.classList.remove("hidden");
}

function closeSettings() {
  settingsModal.classList.add("hidden");
}

function openTaskModal(task, dayKey) {
  activeTask = { task, dayKey };
  taskModalCondition.textContent = currentLang === "en" ? task.conditionEn : task.conditionUk;

  if (task.imgUrl) {
    taskModalImage.src = task.imgUrl;
    taskModalImage.classList.remove("hidden");
  } else {
    taskModalImage.classList.add("hidden");
    taskModalImage.src = "";
  }

  taskAnswer.value = "";

  const subsForTask = lastUserSubmissions.filter((s) => s.task_id === task.id && s.day_key === dayKey);
  const alreadySolved = subsForTask.some((s) => isSubmissionCorrectForTask(task, s));

  const answerForm = document.getElementById("task-modal-answer-form");
  const alreadySolvedEl = document.getElementById("task-modal-already-solved");
  if (answerForm) {
    answerForm.classList.toggle("hidden", !!alreadySolved);
  }
  if (alreadySolvedEl) {
    alreadySolvedEl.classList.toggle("hidden", !alreadySolved);
    alreadySolvedEl.textContent = t("alreadySolved");
  }

  taskModal.classList.remove("hidden");

  if (window.MathJax) {
    window.MathJax.typesetPromise([taskModalCondition]).catch(() => { });
  }
  if (!alreadySolved) taskAnswer.focus();
}

function closeTaskModal() {
  taskModal.classList.add("hidden");
  activeTask = null;
}

function computeStats(items) {
  // We only count the MAXIMUM points earned on any specific day key to adhere to the rule
  const dayMaxPoints = new Map();
  items.forEach(item => {
    if (item.points > 0) {
      const existing = dayMaxPoints.get(item.day_key) || 0;
      if (item.points > existing) {
        dayMaxPoints.set(item.day_key, item.points);
      }
    }
  });

  const totalPoints = Array.from(dayMaxPoints.values()).reduce((sum, pts) => sum + pts, 0);

  const avgAccuracy = items.length
    ? Math.round(items.reduce((sum, item) => sum + item.accuracy, 0) / items.length)
    : 0;

  return { totalPoints, avgAccuracy };
}

function buildDailyTasks(dayKey, targetDate) {
  const dateKey = getDateKey(targetDate || getLogicalToday());
  const seed = hashString(`${dateKey}-${dayKey}`);
  const rnd = createRng(seed);

  const unrestrictedCustomTasks = [];
  const forcedTasks = [];

  (serverConfig.custom_tasks || []).forEach(t => {
    const taskObj = {
      id: t.id,
      titleUk: t.titleUk,
      titleEn: t.titleEn,
      build: () => ({ conditionUk: t.conditionUk, conditionEn: t.conditionEn }),
      imgUrl: t.imgUrl || "",
      tags: t.tags || "",
      answers: t.answers || "",
      is_scored: t.is_scored !== false,
      fixed_points: t.fixed_points || null,
      fixed_accuracy: t.fixed_accuracy || null
    };

    if (t.is_hidden) return; // Skip hidden tasks altogether

    taskObj.day_assigned = parseInt(t.day_assigned) || 0;

    if (!t.allowedEmails || t.allowedEmails.trim() === "") {
      unrestrictedCustomTasks.push(taskObj);
    } else {
      const allowed = t.allowedEmails.toLowerCase().split(",").map(e => e.trim());
      if (sessionUser && allowed.includes(sessionUser.email.toLowerCase())) {
        forcedTasks.push(taskObj);
      }
    }
  });

  const dayIndex = DAY_KEYS.indexOf(dayKey);
  const targetProperty = dayIndex + 1;

  // 1. Separate explicitly assigned custom tasks from automatic ones
  // Tasks with day_assigned > 0 are STRICTLY bound to that day only - never auto-fill another day
  const explicitlyAssignedToThisDay = unrestrictedCustomTasks.filter(t => t.day_assigned === targetProperty);
  const automaticTasks = unrestrictedCustomTasks.filter(t => t.day_assigned === 0); // Only truly unassigned tasks

  const picked = [];

  // 2. We always need 2 tasks exactly. Fill them with explicity assigned first.
  for (let t of explicitlyAssignedToThisDay) {
    if (picked.length >= 2) break;
    picked.push(t);
  }

  // 3. If we don't have 2 assigned tasks, pull deterministically from the automatic pool
  if (picked.length < 2) {
    const startIndex = Math.max(0, dayIndex) * 2;
    let required = 2 - picked.length;

    for (let i = 0; i < required; i += 1) {
      const taskIdx = startIndex + i;
      if (taskIdx >= automaticTasks.length) break;
      picked.push(automaticTasks[taskIdx]);
    }
  }

  const finalGenerated = [];

  for (let i = 0; i < picked.length; i += 1) {
    const tmpl = picked[i];
    const conditions = tmpl.build(rnd);
    const points = tmpl.fixed_points != null && tmpl.fixed_points !== "" ? parseInt(tmpl.fixed_points) : 12 + Math.floor(rnd() * 12);
    const accuracy = tmpl.fixed_accuracy != null && tmpl.fixed_accuracy !== "" ? parseInt(tmpl.fixed_accuracy) : 72 + Math.floor(rnd() * 26);

    finalGenerated.push({
      id: tmpl.id || `${dateKey}-${dayKey}-${i + 1}`,
      titleUk: tmpl.titleUk,
      titleEn: tmpl.titleEn,
      conditionUk: conditions.conditionUk,
      conditionEn: conditions.conditionEn,
      imgUrl: tmpl.imgUrl || "",
      tags: tmpl.tags || "",
      answers: tmpl.answers || "",
      is_scored: tmpl.is_scored !== false,
      points,
      accuracy
    });
  }

  // Only show email-restricted (forced) tasks on their assigned day, or every day if day_assigned is 0
  const forcedForThisDay = forcedTasks.filter((tmpl) => {
    const assigned = parseInt(tmpl.day_assigned, 10);
    const dayNum = Number.isNaN(assigned) ? 0 : assigned;
    return dayNum === 0 || dayNum === targetProperty;
  });
  forcedForThisDay.forEach((tmpl, i) => {
    const conditions = tmpl.build(rnd);
    const points = tmpl.fixed_points != null && tmpl.fixed_points !== "" ? parseInt(tmpl.fixed_points) : 15 + Math.floor(rnd() * 10);
    const accuracy = tmpl.fixed_accuracy != null && tmpl.fixed_accuracy !== "" ? parseInt(tmpl.fixed_accuracy) : 85 + Math.floor(rnd() * 15);
    finalGenerated.push({
      id: tmpl.id || `${dateKey}-${dayKey}-f${i + 1}`,
      titleUk: tmpl.titleUk,
      titleEn: tmpl.titleEn,
      conditionUk: conditions.conditionUk,
      conditionEn: conditions.conditionEn,
      imgUrl: tmpl.imgUrl || "",
      tags: tmpl.tags || "",
      answers: tmpl.answers || "",
      is_scored: tmpl.is_scored !== false,
      points,
      accuracy
    });
  });

  return finalGenerated;
}

function ensureMathSymbols() {
  if (mathSymbols.childElementCount > 0) return;
  SYMBOLS.forEach((symbol) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "symbol-btn";
    button.textContent = symbol;
    button.addEventListener("click", () => insertSymbol(symbol));
    mathSymbols.appendChild(button);
  });
}

function insertSymbol(symbol) {
  const start = taskAnswer.selectionStart;
  const end = taskAnswer.selectionEnd;
  const before = taskAnswer.value.slice(0, start);
  const after = taskAnswer.value.slice(end);
  taskAnswer.value = `${before}${symbol}${after}`;
  const pos = start + symbol.length;
  taskAnswer.setSelectionRange(pos, pos);
  taskAnswer.focus();
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.title = t("pageTitle");

  authTitle.textContent = t("authTitle");
  if (authSubtitle) authSubtitle.textContent = t("authSubtitle");

  showLoginBtn.textContent = t("tabLogin");
  showRegisterBtn.textContent = t("tabRegister");

  loginEmail.placeholder = t("loginEmailPlaceholder");
  loginPassword.placeholder = t("loginPasswordPlaceholder");
  loginSubmitButton.textContent = t("loginSubmit");

  registerName.placeholder = t("registerNamePlaceholder");
  registerEmail.placeholder = t("registerEmailPlaceholder");
  registerAge.placeholder = t("registerAgePlaceholder");
  registerPlace.placeholder = t("registerPlacePlaceholder");
  registerPassword.placeholder = t("registerPasswordPlaceholder");
  registerSubmitButton.textContent = t("registerSubmit");

  if (pointsHeaderLabel) pointsHeaderLabel.textContent = t("pointsHeaderLabel");
  tasksDescription.textContent = t("tasksDescription");
  pointsLabel.textContent = t("pointsLabel");
  accuracyLabel.textContent = t("accuracyLabel");
  weekTitle.textContent = t("weekTitle");

  leaderboardTitle.textContent = t("leaderboardTitle");
  lbColPlace.textContent = t("lbPlace");
  lbColName.textContent = t("lbName");
  lbColPoints.textContent = t("lbPoints");
  lbColAccuracy.textContent = t("lbAccuracy");
  leaderboardSearchInput.placeholder = t("leaderboardSearchPlaceholder");
  toggleLeaderboardButton.textContent = isLeaderboardOpen ? t("hideLeaderboard") : t("showLeaderboard");

  adminTitle.textContent = t("adminTitle");
  adminColTime.textContent = t("adminColTime");
  adminColUser.textContent = t("adminColUser");
  adminColTask.textContent = t("adminColTask");
  adminColPoints.textContent = t("adminColPoints");
  adminColAnswer.textContent = t("adminColAnswer");

  taskModalTitle.textContent = t("taskModalTitle");
  answerLabel.textContent = t("answerLabel");
  taskAnswer.placeholder = t("answerPlaceholder");
  symbolsLabel.textContent = t("symbolsLabel");
  submitAnswerButton.textContent = t("submitAnswer");
  cancelTaskButton.textContent = t("cancelTask");

  if (btnToggleTasks) btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");

  settingsTitle.textContent = t("settingsTitle");
  settingsQuestion.textContent = t("settingsQuestion");
  languageLabel.textContent = t("languageLabel");
  saveLanguageButton.textContent = t("changeLanguage");
  backButton.textContent = t("back");
  deleteAccountButton.textContent = t("deleteAccount");
  logoutButton.textContent = t("logout");
  settingsButton.setAttribute("aria-label", t("settingsTitle"));
  adminInfo.textContent = isAdmin(sessionUser) ? t("adminInfoOn") : t("adminInfoOff");

  languageSelect.querySelector("option[value='uk']").textContent = t("langUk");
  languageSelect.querySelector("option[value='en']").textContent = t("langEn");

  updateLiveTimestamp();
  if (!appSection.classList.contains("hidden")) {
    renderDashboard();
  }
}

async function renderDayTasks(submissions) {
  if (!sessionUser) return;
  if (!submissions) {
    submissions = await api("/api/submissions/me").catch(() => []);
  }

  // Determine active day key based on our shifting calendar
  const activeDayIndex = getCompetitionDayIndex(activeViewingDate);
  const activeDayKey = DAY_KEYS[activeDayIndex];

  const activeDateKey = getDateKey(activeViewingDate);
  const todayDateKey = getDateKey(getLogicalToday());

  const tasks = buildDailyTasks(activeDayKey, activeViewingDate);

  // Always show just the competition day label (no raw date)
  dayLabel.textContent = formatDay(activeDayKey);

  // Use competition day index (0-4) to avoid time-of-day mismatch bugs
  btnPrevDay.style.visibility = activeDayIndex <= 0 ? "hidden" : "visible";
  btnNextDay.style.visibility = activeDayIndex >= DAY_KEYS.length - 1 ? "hidden" : "visible";

  const isFuture = activeViewingDate > getLogicalToday();

  tasksList.innerHTML = "";

  if (!isAdmin(sessionUser) && !serverConfig.tasks_open) {
    // Tasks not yet opened by admin — show message inside task list area
    tasksList.classList.remove("hidden");
    tasksList.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "tasks-empty-msg muted";
    msg.textContent = isFuture ? "Задачі ще не опубліковані!" : "Задачі ще не опубліковані";
    tasksList.appendChild(msg);
    return;
  }

  tasksList.classList.remove("hidden");

  if (tasks.length === 0) {
    // No tasks for this day — show Coming soon
    tasksList.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "tasks-empty-msg muted";
    msg.textContent = currentLang === "en" ? "Coming soon" : "Скоро з'являться";
    tasksList.appendChild(msg);
    return;
  }

  tasksList.innerHTML = "";
  tasks.forEach((task) => {
    const card = document.createElement("article");
    const button = document.createElement("button");
    const title = currentLang === "en" ? task.titleEn : task.titleUk;

    card.className = "task-item";
    let subInfo = `+${task.points} ${t("pointsWord")} • ${t("accuracyWord")} ${task.accuracy}%`;
    if (task.tags) {
      let tagsDisplay = task.tags.split(',').map(tag => `<span style="background:#4CAF50; color:white; padding:2px 6px; border-radius:4px; font-size:0.7em; margin-right:4px;">${escapeHTML(tag.trim())}</span>`).join('');
      subInfo += `<br><div style="margin-top:6px;">${tagsDisplay}</div>`;
    }
    card.innerHTML = `<h5>${escapeHTML(title)}</h5><p>${subInfo}</p>`;

    const taskSubmissions = submissions
      .filter((s) => s.task_id === task.id && s.day_key === activeDayKey)
      .sort((a, b) => b.ts - a.ts);

    const lastSubmission = taskSubmissions[0];
    const wasEverCorrect = taskSubmissions.some((s) => isSubmissionCorrectForTask(task, s));
    const isSolved = wasEverCorrect;

    if (isSolved) {
      // Task already solved: keep green “Solved ✓” state,
      // but still allow opening the modal to re-read the task text.
      button.type = "button";
      button.textContent = currentLang === "en" ? "Solved \u2713" : "\u0412\u0438\u0440\u0456\u0448\u0435\u043d\u043e \u2713";
      button.style.background = "#4CAF50";
      button.style.color = "white";
      button.style.cursor = "pointer";
      button.style.opacity = "0.9";
      button.addEventListener("click", () => openTaskModal(task, activeDayKey));
    } else {
      button.type = "button";
      button.textContent = t("chooseTask");
      button.addEventListener("click", () => openTaskModal(task, activeDayKey));
    }

    card.appendChild(button);

    // Show last submitted answer in purple (low-disruption)
    if (lastSubmission && lastSubmission.answer) {
      const answerBadge = document.createElement("p");
      answerBadge.style.cssText = "margin-top:8px; font-size:0.82em; padding:4px 10px; border-radius:6px; background:rgba(107,82,195,0.12); color:#5e4a9e; border:1px solid rgba(107,82,195,0.35);";
      const label = currentLang === "en" ? "Your answer" : "\u0412\u0430\u0448\u0430 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u044c";
      answerBadge.textContent = `${label}: ${escapeHTML(lastSubmission.answer)}`;
      card.appendChild(answerBadge);
    }

    tasksList.appendChild(card);
  });
}

function renderWeekStats(submissions) {
  weekStats.innerHTML = "";
  const latestByDay = new Map();

  submissions.forEach((item) => {
    const current = latestByDay.get(item.day_key);
    if (!current) {
      latestByDay.set(item.day_key, item);
    } else if (item.points > current.points || (item.points === current.points && item.accuracy > current.accuracy)) {
      latestByDay.set(item.day_key, item);
    }
  });

  DAY_KEYS.forEach((dayKey) => {
    const row = document.createElement("div");
    const bar = document.createElement("div");
    const fill = document.createElement("div");
    const info = latestByDay.get(dayKey);

    row.className = "day-row";
    bar.className = "day-bar";
    fill.className = "day-fill";
    fill.style.width = `${info ? info.accuracy : 8}%`;

    bar.appendChild(fill);
    row.innerHTML = `<strong>${formatDay(dayKey)}</strong>`;
    row.appendChild(bar);

    const suffix = document.createElement("span");
    suffix.textContent = info ? `${info.points} ${currentLang === "en" ? "pts" : "б."} • ${info.accuracy}%` : t("noTask");

    row.appendChild(suffix);
    weekStats.appendChild(row);
  });
}

async function renderLeaderboard() {
  leaderboardBody.innerHTML = "";

  // fetch only if undefined or empty, basically fetching once or when forced
  let rows = await api("/api/leaderboard");
  cachedLeaderboardRows = rows;

  renderLeaderboardRows();
}

function renderLeaderboardRows() {
  leaderboardBody.innerHTML = "";
  const query = (leaderboardSearchInput.value || "").trim().toLowerCase();
  const hiddenEmails = (serverConfig.hidden_users || "").toLowerCase().split(",").map(e => e.trim()).filter(Boolean);

  const filtered = cachedLeaderboardRows.filter(r => {
    // Check if user is hidden
    if (hiddenEmails.includes(r.email.toLowerCase())) return false;

    // Check search query
    if (!query) return true;
    const nameMatch = (r.name || "").toLowerCase().includes(query);
    const placeMatch = (r.place_of_study || "").toLowerCase().includes(query);
    return nameMatch || placeMatch;
  });

  if (!filtered.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4">${t("noLeaderboardData")}</td>`;
    leaderboardBody.appendChild(tr);
    return;
  }

  filtered.forEach((row, idx) => {
    const tr = document.createElement("tr");
    if (sessionUser && row.email === sessionUser.email) tr.classList.add("current-user");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHTML(row.name)}</td>
      <td>${row.points}</td>
      <td>${row.accuracy}%</td>
    `;
    leaderboardBody.appendChild(tr);
  });
}

leaderboardSearchInput.addEventListener("input", renderLeaderboardRows);

async function renderAdminLog() {
  adminLogBody.innerHTML = "";
  if (!isAdmin(sessionUser)) {
    adminSection.classList.add("hidden");
    return;
  }

  adminSection.classList.remove("hidden");

  const submissions = await api("/api/submissions");
  const sorted = [...submissions].sort((a, b) => b.ts - a.ts);

  if (!sorted.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5">${t("noAdminData")}</td>`;
    adminLogBody.appendChild(tr);
    return;
  }

  sorted.forEach((item) => {
    const tr = document.createElement("tr");
    const locale = currentLang === "en" ? "en-US" : "uk-UA";
    const taskTitle = currentLang === "en" ? item.task_title_en : item.task_title_uk;
    tr.innerHTML = `
      <td>${new Date(item.ts).toLocaleString(locale)}</td>
      <td>${escapeHTML(item.name)} (${escapeHTML(item.email)})</td>
      <td>${escapeHTML(taskTitle)}</td>
      <td>${item.points}</td>
      <td>${escapeHTML((item.answer || "").slice(0, 70))}</td>
    `;
    adminLogBody.appendChild(tr);
  });
}

function toggleLeaderboard() {
  isLeaderboardOpen = !isLeaderboardOpen;
  leaderboardWrap.classList.toggle("hidden", !isLeaderboardOpen);
  toggleLeaderboardButton.textContent = isLeaderboardOpen ? t("hideLeaderboard") : t("showLeaderboard");
}

function updateLiveTimestamp() {
  const now = new Date();
  const locale = currentLang === "en" ? "en-US" : "uk-UA";
  ratingUpdated.textContent = `${t("updated")}: ${now.toLocaleTimeString(locale)}`;
}

async function renderDashboard() {
  if (!sessionUser) return;

  const submissions = await api("/api/submissions/me");
  const stats = computeStats(submissions);

  welcomeTitle.textContent = `${t("welcomePrefix")}, ${sessionUser.name}`;
  const ageText = sessionUser.age ? `${t("ageWord")}: ${sessionUser.age}` : `${t("ageWord")}: -`;
  const placeText = sessionUser.place_of_study || "-";
  userMeta.textContent = `${t("placeWord")}: ${placeText} • ${ageText}`;

  pointsValue.textContent = `${stats.totalPoints}`;
  accuracyValue.textContent = `${stats.avgAccuracy}%`;
  totalRating.textContent = `${stats.totalPoints}`;

  if (btnToggleTasks) btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");

  lastUserSubmissions = submissions || [];
  await renderDayTasks(submissions);
  renderWeekStats(submissions);
  await renderLeaderboard();
  await renderAdminLog();
  updateLiveTimestamp();
}

async function openApp() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  settingsButton.classList.remove("hidden");

  try {
    serverConfig = await api("/api/config");
  } catch (e) {
    console.error("Config fetch failed", e);
  }

  try {
    await renderDashboard();
  } catch (err) {
    console.error("Dashboard fetch failed:", err);
    throw err; // Re-throw to propagate if login flow needs to know
  }

  if (clockTimer) clearInterval(clockTimer);
  clockTimer = setInterval(updateLiveTimestamp, 1000);
}

function logout() {
  closeSettings();
  closeTaskModal();
  appSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  settingsButton.classList.add("hidden");
  adminSection.classList.add("hidden");

  sessionUser = null;
  sessionToken = null;
  setStorage("matclub_session_user", null);
  setStorage("matclub_session_token", null);

  switchTo("login");
  loginForm.reset();
  showMessage(t("logoutSuccess"), "success");

  if (clockTimer) {
    clearInterval(clockTimer);
    clockTimer = null;
  }
}

async function deleteCurrentAccount() {
  if (!sessionUser) return;
  const ok = window.confirm(t("deleteConfirm"));
  if (!ok) return;
  try {
    await api("/api/submissions", { method: "DELETE" });
    showMessage(t("deleteSuccess"), "success");
    logout();
  } catch (err) {
    showMessage(t("deleteAdminBlocked"), "error");
  }
}

async function submitTaskAnswer() {
  if (!activeTask || !sessionUser) return;
  const alreadyCorrect = lastUserSubmissions.some(
    (s) => s.task_id === activeTask.task.id && s.day_key === activeTask.dayKey && isSubmissionCorrectForTask(activeTask.task, s)
  );
  if (alreadyCorrect) {
    showMessage(t("alreadySolved"), "error");
    return;
  }
  const answer = taskAnswer.value.trim();
  if (!answer) {
    showMessage(t("answerRequired"), "error");
    return;
  }

  let finalPoints = activeTask.task.points;
  let finalAccuracy = activeTask.task.accuracy;

  const expectedAnswers = activeTask.task.answers;
  if (expectedAnswers && expectedAnswers.trim() !== "") {
    const list = expectedAnswers.split(",").map(a => a.trim().toLowerCase());
    if (list.includes(answer.toLowerCase())) {
      finalPoints = activeTask.task.points;
      finalAccuracy = 100;
      showMessage(t("answerCorrect"), "success");
    } else {
      finalPoints = 0;
      finalAccuracy = 0;
      showMessage(t("answerWrong"), "error");
    }
  }

  // No points if tasks are closed (admin controls visibility manually)
  if (!serverConfig.tasks_open && !isAdmin(sessionUser)) {
    finalPoints = 0;
    finalAccuracy = 0;
  }

  // No points for past days
  const activeDateKey = getDateKey(activeViewingDate);
  const realTodayDateKey = getDateKey(getLogicalToday());

  if (activeDateKey !== realTodayDateKey && activeViewingDate < getLogicalToday()) {
    if (finalPoints > 0) {
      showMessage(`Ви вирішили задачу за минулий день! Бали не нараховуються.`, "success");
    }
    finalPoints = 0;
  }

  // Per-task toggle: if this task is marked as non-scoring, never award points or accuracy
  const isScored = activeTask.task.is_scored !== false;
  if (!isScored) {
    finalPoints = 0;
    finalAccuracy = 0;
  }

  // Enforce Max Score Logging: we still POST the points to the server.
  // The computeStats function ALREADY takes care of only giving them the BEST task logic!
  // So if they submit a 10 pt task, and then a 20 pt task, computeStats will only credit 20.

  await api("/api/submissions", {
    method: "POST",
    body: JSON.stringify({
      day_key: activeTask.dayKey,
      date_key: activeDateKey, // Save it using the actively viewed date so it binds to the correct day
      task_id: activeTask.task.id,
      task_title_uk: activeTask.task.titleUk,
      task_title_en: activeTask.task.titleEn,
      points: finalPoints,
      accuracy: finalAccuracy,
      answer
    })
  });

  closeTaskModal();
  await renderDashboard();
}

showLoginBtn.addEventListener("click", () => switchTo("login"));
showRegisterBtn.addEventListener("click", () => switchTo("register"));
settingsButton.addEventListener("click", openSettings);
toggleLeaderboardButton.addEventListener("click", toggleLeaderboard);
backButton.addEventListener("click", closeSettings);
deleteAccountButton.addEventListener("click", deleteCurrentAccount);
logoutButton.addEventListener("click", logout);
saveLanguageButton.addEventListener("click", () => {
  currentLang = languageSelect.value;
  setStorage("matclub_lang", currentLang);
  applyLanguage();
  renderDashboard();
  closeSettings();
});

if (btnPrevDay) {
  btnPrevDay.addEventListener("click", () => {
    const prev = new Date(activeViewingDate);
    prev.setDate(prev.getDate() - 1);
    // Compare by date only (strip time) - use competition day index as source of truth
    const prevDayIndex = getCompetitionDayIndex(prev);
    if (prevDayIndex >= 0) { // day1 index is 0, so this allows navigating to day1
      activeViewingDate = prev;
      renderDashboard();
    }
  });
}

if (btnNextDay) {
  btnNextDay.addEventListener("click", () => {
    const next = new Date(activeViewingDate);
    next.setDate(next.getDate() + 1);
    // Compare by date only - max is Day 5 (index 4)
    const nextDayIndex = getCompetitionDayIndex(next);
    if (nextDayIndex <= DAY_KEYS.length - 1) {
      activeViewingDate = next;
      renderDashboard();
    }
  });
}
submitAnswerButton.addEventListener("click", submitTaskAnswer);
cancelTaskButton.addEventListener("click", closeTaskModal);

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) closeSettings();
});

taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) closeTaskModal();
});

if (btnToggleTasks) {
  btnToggleTasks.addEventListener("click", async () => {
    serverConfig.tasks_open = !serverConfig.tasks_open;
    try {
      await api("/api/config", { method: "POST", body: JSON.stringify(serverConfig) });
      showMessage(t("tasksOpenSuccess"), "success");
      btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");
      await renderDayTasks();
    } catch (err) {
      showMessage("Error saving config", "error");
    }
  });
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = registerName.value.trim();
  const email = registerEmail.value.trim().toLowerCase();
  const age = registerAge.value.trim();
  const place_of_study = registerPlace.value.trim();
  const password = registerPassword.value;

  if (!name || !email || !age || !place_of_study || !password) {
    showMessage(t("fillAll"), "error");
    return;
  }

  try {
    await api("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, age, place_of_study, password })
    });

    registerForm.reset();
    await loginWithCredentials(email, password);
  } catch (err) {
    const text = (err && err.message) || "";
    if (text.includes("reserved")) showMessage(t("emailReserved"), "error");
    else if (text.includes("exists")) showMessage(t("emailExists"), "error");
    else showMessage(t("registerFirst"), "error");
  }
});

async function loginWithCredentials(email, password) {
  const token = btoa(unescape(encodeURIComponent(`${email}:${password}`)));
  sessionToken = token;
  setStorage("matclub_session_token", token);

  const loginData = await api("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  sessionUser = loginData.user;
  setStorage("matclub_session_user", sessionUser);
  await openApp();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;

  try {
    await loginWithCredentials(email, password);
  } catch (err) {
    showMessage(t("invalidCreds"), "error");
  }
});

ensureMathSymbols();
applyLanguage();

const storedUser = getStorage("matclub_session_user", null);
const storedToken = getStorage("matclub_session_token", null);

if (storedUser && storedToken) {
  sessionUser = storedUser;
  sessionToken = storedToken;
  openApp();
} else {
  switchTo("login");
}
