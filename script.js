const board = document.getElementById('board');
const playAgainButton = document.getElementById('play-again');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const saveSettingsButton = document.getElementById('save-settings');
const createRoomButton = document.getElementById('create-room');
const joinRoomButton = document.getElementById('join-room');
const roomModal = document.getElementById('room-modal');
const closeRoomModal = document.getElementById('close-room');
const createRoomConfirm = document.getElementById('create-room-confirm');
const joinRoomConfirm = document.getElementById('join-room-confirm');
const roomIdInput = document.getElementById('room-id');
const notifications = document.getElementById('notifications');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let aiMode = false;
let rankedMode = false;
let userRank = 'Bronze I'; // Default rank
let profilePic = '😀';
let settings = {
    colorX: '#ff0000',
    colorO: '#0000ff',
    borderColor: '#000000',
    backgroundColor: '#ffffff'
};

// Initialize the board
const initBoard = () => {
    board.innerHTML = '';
    boardState.fill('');
    currentPlayer = 'X';
    gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    applySettings();
};

// Handle cell clicks
const handleCellClick = (index) => {
    if (boardState[index] || !gameActive) return;
    boardState[index] = currentPlayer;
    renderCell(index);
    checkWinConditions();
    if (gameActive && aiMode && currentPlayer === 'O') {
        setTimeout(aiMove, 1000);
    }
};

// Render cell based on state
const renderCell = (index) => {
    const cell = board.children[index];
    if (currentPlayer === 'X') {
        cell.innerHTML = `<div class="x-part">X</div>`;
    } else {
        cell.innerHTML = `<div class="o"></div>`;
    }
    cell.classList.add('clicked');
};

// Check for win conditions
const checkWinConditions = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            announceWinner(boardState[a]);
            return;
        }
    }

    if (!boardState.includes('')) {
        announceDraw();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Announce winner
const announceWinner = (winner) => {
    notifications.innerHTML = `<p>${winner} wins!</p>`;
    gameActive = false;
};

// Announce draw
const announceDraw = () => {
    notifications.innerHTML = "<p>It's a draw!</p>";
    gameActive = false;
};

// AI Move
const aiMove = () => {
    let availableCells = boardState.map((val, index) => (val === '') ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[randomCell] = currentPlayer;
        renderCell(randomCell);
        checkWinConditions();
    }
};

// Settings Modal Control
settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
});

closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

saveSettingsButton.addEventListener('click', () => {
    settings.colorX = document.getElementById('color-x').value;
    settings.colorO = document.getElementById('color-o').value;
    settings.borderColor = document.getElementById('border-color').value;
    settings.backgroundColor = document.getElementById('background-color').value;
    applySettings();
    settingsModal.style.display = 'none';
});

// Apply Settings
const applySettings = () => {
    document.body.style.backgroundColor = settings.backgroundColor;
    document.documentElement.style.setProperty('--color-x', settings.colorX);
    document.documentElement.style.setProperty('--color-o', settings.colorO);
    document.documentElement.style.setProperty('--border-color', settings.borderColor);
};

// Play Again Button
playAgainButton.addEventListener('click', () => {
    initBoard();
});

// Room Creation
createRoomButton.addEventListener('click', () => {
    roomModal.style.display = 'block';
});

closeRoomModal.addEventListener('click', () => {
    roomModal.style.display = 'none';
});

// Create Room
createRoomConfirm.addEventListener('click', () => {
    const roomId = roomIdInput.value;
    if (roomId) {
        // Here you can implement your room creation logic
        console.log(`Room ${roomId} created!`);
        roomModal.style.display = 'none';
    }
});

// Join Room
joinRoomConfirm.addEventListener('click', () => {
    const roomId = roomIdInput.value;
    if (roomId) {
        // Here you can implement your room joining logic
        console.log(`Joined room ${roomId}!`);
        roomModal.style.display = 'none';
    }
});

// Initialize the game on load
initBoard();
