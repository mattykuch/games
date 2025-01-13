// Select DOM elements
const diceResultElement = document.getElementById("dice-result");
const player1PositionElement = document.getElementById("player-1-position");
const player1ProgressElement = document.getElementById("player-1-progress");
const player2PositionElement = document.getElementById("player-2-position");
const player2ProgressElement = document.getElementById("player-2-progress");
const rollDiceButton = document.getElementById("roll-dice");

const boardSpaces = document.querySelectorAll(".space");

// Initialize game state
let players = [
  { name: "Matt", position: 1, progress: 0 },
  { name: "Ben", position: 1, progress: 0 }
];
let currentPlayerIndex = 0; // Player 1 starts

// Random events
const randomEvents = [
  { type: "reward", description: "Bonus funding! Gain 5 progress points.", effect: (player) => (player.progress += 5) },
  { type: "challenge", description: "Unexpected delay! Move back 1 space.", effect: (player) => (player.position = Math.max(1, player.position - 1)) },
  { type: "neutral", description: "Nothing happens.", effect: (player) => {} }
];

// Update UI with animations
function updateUI() {
  // Update progress and positions in the sidebar
  player1PositionElement.textContent = players[0].position;
  player1ProgressElement.textContent = players[0].progress;
  player2PositionElement.textContent = players[1].position;
  player2ProgressElement.textContent = players[1].progress;

  // Move player markers
  moveMarker("player1-marker", players[0].position);
  moveMarker("player2-marker", players[1].position);
}

// Move player marker to a specific space
function moveMarker(markerId, position) {
  const marker = document.getElementById(markerId);
  const targetSpace = document.getElementById(`space-${position}`);
  if (marker && targetSpace) {
    const targetRect = targetSpace.getBoundingClientRect();
    const boardRect = targetSpace.parentElement.getBoundingClientRect();

    // Calculate position relative to the board
    const offsetX = targetRect.left - boardRect.left + 5; // 5px padding for marker
    const offsetY = targetRect.top - boardRect.top + 5;

    // Apply transformation for smooth movement
    marker.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
}

// Roll the dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
}

// Handle landing on a space
function handleSpace(player) {
  const spaceId = `space-${player.position}`;
  const space = document.getElementById(spaceId);

  if (space) {
    const spaceName = space.textContent;

    // Handle each milestone or event
    switch (spaceName) {
      case "Finalize Bank Account":
        alert(`${player.name} completed the milestone: Finalize Bank Account! Gain 10 progress points.`);
        player.progress += 10;
        break;

      case "Logo Refresh":
        alert(`${player.name} completed the milestone: Logo Refresh! Gain 8 progress points.`);
        player.progress += 8;
        break;

      case "Unexpected Delay":
        alert(`${player.name} hit a challenge: Unexpected Delay! Lose 5 progress points.`);
        player.progress = Math.max(0, player.progress - 5);
        break;

      case "Develop Branded Brochures":
        alert(`${player.name} completed the milestone: Develop Branded Brochures! Gain 12 progress points.`);
        player.progress += 12;
        break;

      case "Submit First Proposal":
        alert(`${player.name} completed the milestone: Submit First Proposal! Gain 15 progress points.`);
        player.progress += 15;
        break;

      case "Recruit Accountability Partner":
        alert(`${player.name} completed the milestone: Recruit Accountability Partner! Gain 10 progress points.`);
        player.progress += 10;
        break;

      case "Secure CSO Lead":
        alert(`${player.name} earned a reward: Secured a CSO Lead! Gain 5 bonus points.`);
        player.progress += 5;
        break;

      case "Bonus Knowledge Product":
        alert(`${player.name} achieved a branding milestone: Bonus Knowledge Product! Gain 20 progress points.`);
        player.progress += 20;
        break;

      case "Finish":
        alert(`${player.name} completed the roadmap! Gain 25 bonus points.`);
        player.progress += 25;
        rollDiceButton.disabled = true; // Disable further gameplay
        break;

      default:
        alert(`${player.name} landed on a neutral space. Nothing happens.`);
    }
  }
}

// Handle random events
function triggerRandomEvent(player) {
  const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
  alert(`Event: ${event.description}`);
  event.effect(player);
}

// Roll Dice Button Listener
rollDiceButton.addEventListener("click", () => {
  const currentPlayer = players[currentPlayerIndex];
  const diceRoll = rollDice();

  alert(`${currentPlayer.name} rolled a ${diceRoll}!`);
  diceResultElement.textContent = `Roll: ${diceRoll}`;

  // Move player
  currentPlayer.position = Math.min(10, currentPlayer.position + diceRoll);
  handleSpace(currentPlayer);

  // Trigger random event
  triggerRandomEvent(currentPlayer);

  // Check if the player reached the end
  if (currentPlayer.position === 10) {
    alert(`${currentPlayer.name} reached the finish line! Final progress: ${currentPlayer.progress}`);
    return; // End the game
  }

  // Switch to the next player
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

  // Update UI
  updateUI();
});

// Initial UI setup
updateUI();
