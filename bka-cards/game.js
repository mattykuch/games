// Select DOM elements
const timeElement = document.getElementById("time");
const moneyElement = document.getElementById("money");
const progressOperational = document.getElementById("progress-operational");
const progressBranding = document.getElementById("progress-branding");
const progressBusinessDevelopment = document.getElementById("progress-business-development");

const taskNameElement = document.getElementById("task-name");
const taskTypeElement = document.getElementById("task-type");
const taskTimeCostElement = document.getElementById("task-time-cost");
const taskMoneyCostElement = document.getElementById("task-money-cost");
const taskRewardElement = document.getElementById("task-reward");

const drawTaskButton = document.getElementById("draw-task");
const playTaskButton = document.getElementById("play-task");
const skipTaskButton = document.getElementById("skip-task");

// Initialize resources and progress
let time = 12; // 12 turns
let money = 10000; // $10,000
let progress = {
  operational: 0,
  branding: 0,
  businessDevelopment: 0
};

// Task deck
const taskDeck = [
  { name: "Finalize Bank Account", type: "Operational", cost: { time: 1, money: 500 }, reward: 10 },
  { name: "Create Branded Brochures", type: "Branding", cost: { time: 2, money: 1000 }, reward: 15 },
  { name: "Submit a Proposal", type: "Business Development", cost: { time: 1, money: 200 }, reward: 8 },
  { name: "Recruit Accountability Partner", type: "Operational", cost: { time: 2, money: 1500 }, reward: 20 },
  { name: "Develop Knowledge Products", type: "Branding", cost: { time: 3, money: 800 }, reward: 25 }
];

// Random events
const events = [
  { description: "Unexpected expense: Lose $500", effect: () => (money -= 500) },
  { description: "Bonus funding: Gain $1000", effect: () => (money += 1000) },
  { description: "Client praises work: Gain +5 points in Business Development", effect: () => (progress.businessDevelopment += 5) }
];

// Shuffle the deck
function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

// Update UI
function updateUI() {
  timeElement.textContent = `${time} Turns`;
  moneyElement.textContent = `$${money.toLocaleString()}`;
  progressOperational.textContent = progress.operational;
  progressBranding.textContent = progress.branding;
  progressBusinessDevelopment.textContent = progress.businessDevelopment;
}

// Display task details
function displayTask(task) {
  taskNameElement.textContent = task.name;
  taskTypeElement.textContent = task.type;
  taskTimeCostElement.textContent = task.cost.time;
  taskMoneyCostElement.textContent = `$${task.cost.money}`;
  taskRewardElement.textContent = task.reward;
}

// Handle random events
function triggerRandomEvent() {
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  alert(`Event: ${randomEvent.description}`);
  randomEvent.effect();
  updateUI();
}

// Initialize game
let currentTask = null;
shuffleDeck(taskDeck);

// Draw task
drawTaskButton.addEventListener("click", () => {
  if (taskDeck.length === 0) {
    alert("No more tasks in the deck!");
    return;
  }
  currentTask = taskDeck.pop();
  displayTask(currentTask);
  playTaskButton.disabled = false;
  skipTaskButton.disabled = false;
});

// Play task
playTaskButton.addEventListener("click", () => {
  if (!currentTask) {
    alert("No task to play!");
    return;
  }
  if (time >= currentTask.cost.time && money >= currentTask.cost.money) {
    time -= currentTask.cost.time;
    money -= currentTask.cost.money;
    progress[currentTask.type.toLowerCase()] += currentTask.reward;
    alert(`Task completed: ${currentTask.name}`);
    currentTask = null;
    updateUI();
    triggerRandomEvent();
    playTaskButton.disabled = true;
    skipTaskButton.disabled = true;
  } else {
    alert("Not enough resources to complete this task!");
  }
});

// Skip task
skipTaskButton.addEventListener("click", () => {
  if (!currentTask) {
    alert("No task to skip!");
    return;
  }
  alert(`Task skipped: ${currentTask.name}`);
  currentTask = null;
  triggerRandomEvent();
  playTaskButton.disabled = true;
  skipTaskButton.disabled = true;
});

// Initial UI update
updateUI();
