/* ==================================================
   UI MANAGEMENT SYSTEM
================================================== */

const UI = {
    root: null,
    screens: {},
    currentScreen: null,
    
    // Initialize UI
    init(rootElement) {
        this.root = rootElement;
        this.createAllScreens();
        this.showScreen('start');
    },
    
    // Create all screens
    createAllScreens() {
        this.createStartScreen();
        this.createGameScreen();
        this.createResultScreen();
    },
    
    // Create start screen
    createStartScreen() {
        const screen = document.createElement('div');
        screen.id = 'start-screen';
        screen.className = 'screen start-screen';
        
        screen.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; width: 100%;">
                <h1 class="game-title">🎂 Cake Decorating</h1>
                <p class="subtitle">Create beautiful custom cakes!</p>
                
                <div class="features">
                    <div class="feature">✨ Decorate</div>
                    <div class="feature">🎨 Design</div>
                    <div class="feature">🏆 Score</div>
                    <div class="feature">📱 Mobile</div>
                </div>
                
                <button class="start-btn" onclick="Game.startNewGame()">Start Game</button>
            </div>
        `;
        
        this.root.appendChild(screen);
        this.screens.start = screen;
    },
    
    // Create game screen
    createGameScreen() {
        const screen = document.createElement('div');
        screen.id = 'game-screen';
        screen.className = 'screen game-screen hidden';
        
        screen.innerHTML = `
            <div class="game-header">
                <div class="level-info">Level <span id="level-display">1</span></div>
                <div class="level-progress" id="level-progress"></div>
            </div>
            
            <div class="challenge-preview-box">
                <span class="preview-title">Target Cake</span>
                <div class="target-cake-preview" id="target-preview"></div>
            </div>
            
            <div class="canvas-container">
                <canvas id="game-canvas" class="game-canvas" touch-action="none"></canvas>
            </div>
            
            <div class="game-toolbar" id="toolbar">
                <div class="toolbar-section">
                    <label class="toolbar-label">Frosting Style</label>
                    <div class="button-grid" id="frosting-buttons">
                        <button class="tool-button active" data-frosting="smooth" onclick="Game.selectFrosting('smooth')">Smooth</button>
                        <button class="tool-button" data-frosting="spiral" onclick="Game.selectFrosting('spiral')">Spiral</button>
                        <button class="tool-button" data-frosting="piped" onclick="Game.selectFrosting('piped')">Piped</button>
                        <button class="tool-button" data-frosting="rosette" onclick="Game.selectFrosting('rosette')">Rosette</button>
                        <button class="tool-button" data-frosting="wavy" onclick="Game.selectFrosting('wavy')">Wavy</button>
                        <button class="tool-button" data-frosting="drip" onclick="Game.selectFrosting('drip')">Drip</button>
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <label class="toolbar-label">Decorations</label>
                    <div class="button-grid" id="decoration-buttons">
                        <button class="tool-button" data-deco="strawberry" onclick="Game.selectDecoration('strawberry')">🍓</button>
                        <button class="tool-button" data-deco="cherry" onclick="Game.selectDecoration('cherry')">🍒</button>
                        <button class="tool-button" data-deco="blueberry" onclick="Game.selectDecoration('blueberry')">🫐</button>
                        <button class="tool-button" data-deco="raspberry" onclick="Game.selectDecoration('raspberry')">Rasp</button>
                        <button class="tool-button" data-deco="peach" onclick="Game.selectDecoration('peach')">🍑</button>
                        <button class="tool-button" data-deco="pearl" onclick="Game.selectDecoration('pearl')">◯</button>
                        <button class="tool-button" data-deco="sprinkle" onclick="Game.selectDecoration('sprinkle')">✨</button>
                        <button class="tool-button" data-deco="chocolateChip" onclick="Game.selectDecoration('chocolateChip')">•</button>
                        <button class="tool-button" data-deco="heart" onclick="Game.selectDecoration('heart')">♥</button>
                        <button class="tool-button" data-deco="star" onclick="Game.selectDecoration('star')">★</button>
                        <button class="tool-button" data-deco="rose" onclick="Game.selectDecoration('rose')">🌹</button>
                        <button class="tool-button" data-deco="candle" onclick="Game.selectDecoration('candle')">🕯</button>
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <div class="action-buttons">
                        <button class="action-btn undo-btn" onclick="Game.undo()">↶ Undo</button>
                        <button class="action-btn finish-btn" onclick="Game.finishRound()">✓ Finish</button>
                    </div>
                </div>
            </div>
        `;
        
        this.root.appendChild(screen);
        this.screens.game = screen;
    },
    
    // Create result screen
    createResultScreen() {
        const screen = document.createElement('div');
        screen.id = 'result-screen';
        screen.className = 'screen result-screen hidden';
        
        screen.innerHTML = `
            <div class="result-card">
                <h2 class="result-title">Your Cake!</h2>
                
                <div class="score-circle">
                    <div class="score-number" id="final-score">0</div>
                    <div class="score-label">/ 100</div>
                </div>
                
                <p class="feedback-message" id="feedback-message"></p>
                
                <div class="score-breakdown" id="score-breakdown"></div>
                
                <button class="next-button" onclick="Game.nextChallenge()">Next Challenge →</button>
            </div>
        `;
        
        this.root.appendChild(screen);
        this.screens.result = screen;
    },
    
    // Show screen
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        
        if (this.screens[screenName]) {
            this.screens[screenName].classList.remove('hidden');
            this.currentScreen = screenName;
        }
    },
    
    // Update level display
    updateLevelDisplay(level) {
        const levelDisplay = document.getElementById('level-display');
        if (levelDisplay) levelDisplay.textContent = level;
        
        const progress = document.getElementById('level-progress');
        if (progress) {
            progress.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const star = document.createElement('span');
                star.className = 'level-star' + (i < (level % 3) ? ' active' : '');
                star.textContent = '⭐';
                progress.appendChild(star);
            }
        }
    },
    
    // Update target preview
    updateTargetPreview(challenge) {
        const previewContainer = document.getElementById('target-preview');
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 80;
        previewContainer.appendChild(canvas);
        
        // Draw preview cake
        const ctx = canvas.getContext('2d');
        const tempCake = {
            shape: challenge.cakeShape,
            layers: challenge.layers,
            cakeColor: '#f5deb3',
            creamColor: challenge.creamColor,
            frostingStyle: challenge.frostingStyle,
            frostingPaths: [],
            decorations: [],
            candles: challenge.decorations.candles || 0
        };
        
        // Simple preview render
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = challenge.creamColor;
        ctx.beginPath();
        ctx.ellipse(75, 40, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();
    },
    
    // Update frosting selection
    selectFrostingButton(style) {
        document.querySelectorAll('[data-frosting]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.frosting === style) {
                btn.classList.add('active');
            }
        });
    },
    
    // Update decoration selection
    selectDecorationButton(type) {
        document.querySelectorAll('[data-deco]').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.deco === type) {
                btn.classList.add('active');
            }
        });
    },
    
    // Show result screen
    showResult(score, feedback, breakdown) {
        this.showScreen('result');
        
        const scoreDisplay = document.getElementById('final-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = '0';
            // Animate score counter
            AnimationSystem.animateScore(0, score, 1000, (value) => {
                scoreDisplay.textContent = value;
            });
        }
        
        const feedbackMsg = document.getElementById('feedback-message');
        if (feedbackMsg) feedbackMsg.textContent = feedback;
        
        const breakdownDiv = document.getElementById('score-breakdown');
        if (breakdownDiv) {
            breakdownDiv.innerHTML = '';
            for (const [label, data] of Object.entries(breakdown)) {
                const item = document.createElement('div');
                item.className = 'score-item';
                item.innerHTML = `
                    <span class="score-item-label">${label}</span>
                    <span class="score-item-value">${data.value}/${data.max}</span>
                `;
                breakdownDiv.appendChild(item);
            }
        }
        
        // Animate result card
        const card = document.querySelector('.result-card');
        if (card) {
            AnimationSystem.animatePopIn(card, 500);
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
