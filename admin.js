const API_BASE = "";
let sessionToken = localStorage.getItem("matclub_session_token");
let sessionUser = null;
try {
  let u = localStorage.getItem("matclub_session_user");
  if(u) sessionUser = JSON.parse(u);
} catch(e) {}

const loginOverlay = document.getElementById("login-overlay");
const adminContent = document.getElementById("admin-content");
const tasksContainer = document.getElementById("tasks-container");
const btnAddNew = document.getElementById("btn-add-new");

let serverConfig = { tasks_open: false, custom_tasks: [] };

function authHeaders() {
  if (!sessionToken) return {};
  return { Authorization: `Basic ${sessionToken}` };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function loadConfig() {
  try {
    serverConfig = await api("/api/config");
    document.getElementById("global-disabled-tags").value = serverConfig.disabled_tags || "";
    document.getElementById("global-hidden-users").value = serverConfig.hidden_users || "";
    renderTasks();
  } catch (e) {
    alert("Помилка завантаження конфігурації");
  }
}

async function saveConfig() {
  try {
    await api("/api/config", { method: "POST", body: JSON.stringify(serverConfig) });
    alert("Збережено!");
    renderTasks();
  } catch (e) {
    alert("Помилка збереження");
  }
}

window.saveGlobalConfig = function() {
  serverConfig.disabled_tags = document.getElementById("global-disabled-tags").value.trim();
  serverConfig.hidden_users = document.getElementById("global-hidden-users").value.trim();
  saveConfig();
}

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateTaskId() {
  return "task_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 11);
}

function renderTasks() {
  tasksContainer.innerHTML = "";
  serverConfig.custom_tasks = serverConfig.custom_tasks || [];
  
  if (serverConfig.custom_tasks.length === 0) {
      tasksContainer.innerHTML = "<p style='color:#777;'>У вас ще немає кастомних задач. Створіть першу!</p>";
      return;
  }

  serverConfig.custom_tasks.forEach((task, index) => {
    const isScored = task.is_scored !== false; // default: scored unless explicitly turned off
    const card = document.createElement("div");
    card.className = "task-card";
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
         <input type="text" id="t-prod-name-${index}" value="${escapeHTML(task.production_name || `Задача #${index + 1}`)}" placeholder="Внутрішня назва (не видно гравцям)" style="font-weight:bold; font-size:1.1em; background:rgba(255,255,255,0.9); border:1px solid rgba(135,111,221,0.5); border-radius:6px; padding:6px 10px; width:60%;" />
         <button class="modal-btn delete" onclick="deleteTask(${index})" style="background:#e53935; width:auto; padding:4px 8px; font-size:0.8em; margin:0;">Видалити</button>
      </div>
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Назва (UA):</label>
             <input type="text" id="t-name-uk-${index}" value="${escapeHTML(task.titleUk)}" />
             
             <label class="muted">Умова LaTeX (UA):</label>
             <textarea rows="3" id="t-cond-uk-${index}">${escapeHTML(task.conditionUk)}</textarea>
          </div>
          <div style="flex:1;">
             <label class="muted">Назва (EN):</label>
             <input type="text" id="t-name-en-${index}" value="${escapeHTML(task.titleEn)}" />
             
             <label class="muted">Умова LaTeX (EN):</label>
             <textarea rows="3" id="t-cond-en-${index}">${escapeHTML(task.conditionEn)}</textarea>
          </div>
      </div>
      
      <label class="muted">URL Зображення:</label>
      <input type="url" id="t-img-${index}" value="${escapeHTML(task.imgUrl)}" placeholder="https://..." />
      
      <label class="muted">Обмеження доступу (Emails через кому):</label>
      <input type="text" id="t-emails-${index}" value="${escapeHTML(task.allowedEmails)}" placeholder="Залиште порожнім, щоб була доступна всім" />
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Теги (через кому):</label>
             <input type="text" id="t-tags-${index}" value="${escapeHTML(task.tags)}" placeholder="math, logic, easy" />
          </div>
          <div style="flex:1;">
             <label class="muted">Очікувана/можлива відповідь:</label>
             <input type="text" id="t-answers-${index}" value="${escapeHTML(task.answers)}" placeholder="10.5" />
          </div>
      </div>
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Фіксовані бали (можна залишити порожнім):</label>
             <input type="number" id="t-points-${index}" value="${task.fixed_points || ''}" placeholder="Напр. 50" min="0" />
          </div>
          <div style="flex:1;">
             <label class="muted">Фіксована правильність % (можна порожнім):</label>
             <input type="number" id="t-accuracy-${index}" value="${task.fixed_accuracy || ''}" placeholder="Напр. 100" min="0" max="100" />
          </div>
      </div>
      
      <div style="margin-top:10px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
             <input type="checkbox" id="t-hidden-${index}" ${task.is_hidden ? 'checked' : ''} style="width:auto; height:18px; width:18px;" />
             <span style="color:#ffaa00;">Приховати задачу (вона більше не буде випадати користувачам)</span>
          </label>
      </div>

      <div style="margin-top:8px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
             <input type="checkbox" id="t-is-scored-${index}" ${isScored ? 'checked' : ''} style="width:auto; height:18px; width:18px;" />
             <span style="color:#2e7d32;">SUBMISSION IS TAKEN (якщо вимкнено — правильна відповідь не дає балів)</span>
          </label>
      </div>

      <div style="margin-top:10px;">
          <label class="muted">Прив'язка до конкретного дня (0 - автоматично):</label>
          <select id="t-day-assigned-${index}" style="padding:6px; background:#fff; border:1px solid #ccc; border-radius:4px; font-size:0.9em;">
             <option value="0" ${parseInt(task.day_assigned||0) === 0 ? 'selected' : ''}>Автоматично (за порядком)</option>
             <option value="1" ${parseInt(task.day_assigned) === 1 ? 'selected' : ''}>День 1 (01.04)</option>
             <option value="2" ${parseInt(task.day_assigned) === 2 ? 'selected' : ''}>День 2 (02.04)</option>
             <option value="3" ${parseInt(task.day_assigned) === 3 ? 'selected' : ''}>День 3 (03.04)</option>
             <option value="4" ${parseInt(task.day_assigned) === 4 ? 'selected' : ''}>День 4 (04.04)</option>
          </select>
      </div>
      
      <button class="modal-btn" onclick="saveTask(${index})" style="width:100%; margin-top:15px; background:#4CAF50;">Зберегти редагування</button>
    `;
    
    tasksContainer.appendChild(card);
  });
}

window.deleteTask = function(index) {
  if (confirm("Точно видалити цю задачу?")) {
    serverConfig.custom_tasks.splice(index, 1);
    saveConfig();
  }
}

window.saveTask = function(index) {
  const existing = serverConfig.custom_tasks[index];
  const stableId = (existing && existing.id) ? existing.id : generateTaskId();
  serverConfig.custom_tasks[index] = {
    id: stableId,
    production_name: document.getElementById(`t-prod-name-${index}`).value.trim(),
    titleUk: document.getElementById(`t-name-uk-${index}`).value.trim(),
    titleEn: document.getElementById(`t-name-en-${index}`).value.trim(),
    conditionUk: document.getElementById(`t-cond-uk-${index}`).value.trim(),
    conditionEn: document.getElementById(`t-cond-en-${index}`).value.trim(),
    imgUrl: document.getElementById(`t-img-${index}`).value.trim(),
    allowedEmails: document.getElementById(`t-emails-${index}`).value.trim(),
    tags: document.getElementById(`t-tags-${index}`).value.trim(),
    answers: document.getElementById(`t-answers-${index}`).value.trim(),
    fixed_points: document.getElementById(`t-points-${index}`).value,
    fixed_accuracy: document.getElementById(`t-accuracy-${index}`).value,
    is_hidden: document.getElementById(`t-hidden-${index}`).checked,
    is_scored: document.getElementById(`t-is-scored-${index}`).checked,
    day_assigned: parseInt(document.getElementById(`t-day-assigned-${index}`).value) || 0
  };
  saveConfig();
}

btnAddNew.addEventListener("click", () => {
  serverConfig.custom_tasks.unshift({
     id: generateTaskId(),
     production_name: "",
     titleUk: "Нова задача",
     titleEn: "New task",
     conditionUk: "", conditionEn: "", imgUrl: "", allowedEmails: "", tags: "", answers: "", fixed_points: "", fixed_accuracy: "", is_hidden: false, is_scored: true, day_assigned: 0
  });
  renderTasks();
});

if (!sessionUser || !sessionUser.is_admin) {
  loginOverlay.style.display = "block";
} else {
  adminContent.style.display = "block";
  loadConfig();
}
