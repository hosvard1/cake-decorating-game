/* ==================================================
   MAIN GAME ENGINE
================================================== */

const Game = {
    // Game state
    initialized: false,
    gameCanvas: null,
    gameCtx: null,
    targetPreviewCanvas: null,
    targetPreviewCtx: null,
    
    // Input tracking
    isDragging: false,
    draggedDecoration: null,
    lastX: 0,
    lastY: 0,
    
    // Initialize game
    init() {
        if (this.initialized) return;
        
        // Get canvas
        this.gameCanvas = document.getElementById('game-canvas');
        if (!this.gameCanvas) {
            console.error('Game canvas not found');
            return;
        }
        
        this.gameCtx = this.gameCanvas.getContext('2d');
        
        // Setup canvas size
        const container = this.gameCanvas.parentElement;
        this.gameCanvas.width = container.offsetWidth;
        this.gameCanvas.height = container.offsetHeight;
        
        // Initialize systems
        FrostingSystem.init(this.gameCanvas);
        DecorationSystem.init();
        CakeRenderer.init(this.gameCanvas);
        
        // Setup input handlers
        this.setupInputHandlers();
        
        // Setup UI
        UI.init(document.getElementById('game-root'));
        
        this.initialized = true;
        console.log('Game initialized successfully');
    },
    
    // Setup input handlers for mouse and touch
    setupInputHandlers() {
        const canvas = this.gameCanvas;
        
        // Mouse events
        canvas.addEventListener('mousedown', (e) => this.handlePointerDown(e));
        canvas.addEventListener('mousemove', (e) => this.handlePointerMove(e));
        canvas.addEventListener('mouseup', (e) => this.handlePointerUp(e));
        canvas.addEventListener('mouseleave', (e) => this.handlePointerUp(e));
        
        // Touch events
        canvas.addEventListener('touchstart', (e) => this.handlePointerDown(e));
        canvas.addEventListener('touchmove', (e) => this.handlePointerMove(e));
        canvas.addEventListener('touchend', (e) => this.handlePointerUp(e));
        
        // Prevent scrolling while interacting
        canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    },
    
    // Handle pointer down (mouse/touch start)
    handlePointerDown(e) {
        e.preventDefault();
        
        const rect = this.gameCanvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        
        this.lastX = x;
        this.lastY = y;
        
        // Check if clicked on a decoration
        const deco = DecorationSystem.getDecorationAt(x, y);
        if (deco) {
            this.draggedDecoration = deco;
            this.isDragging = true;
        } else if (GameState.selectedTool === 'frosting') {
            // Start frosting
            GameState.saveState();
            FrostingSystem.startDrawing(x, y);
            this.isDragging = true;
        }
    },
    
    // Handle pointer move (mouse/touch move)
    handlePointerMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const rect = this.gameCanvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        
        if (this.draggedDecoration) {
            // Move decoration
            DecorationSystem.move(this.draggedDecoration.id, x, y);
        } else if (GameState.selectedTool === 'frosting') {
            // Draw frosting
            FrostingSystem.draw(x, y);
        }
        
        this.lastX = x;
        this.lastY = y;
        
        // Redraw
        this.render();
    },
    
    // Handle pointer up (mouse/touch end)
    handlePointerUp(e) {
        if (this.isDragging) {
            if (FrostingSystem.isDrawing) {
                FrostingSystem.stopDrawing();
            }
            this.isDragging = false;
            this.draggedDecoration = null;
        }
    },
    
    // Render game
    render() {
        // Clear canvas
        this.gameCtx.fillStyle = 'rgba(252, 231, 243, 0.1)';
        this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        
        // Draw cake
        CakeRenderer.drawCake(GameState.playerCake);
        
        // Draw frosting
        FrostingSystem.render();
        
        // Draw decorations
        DecorationSystem.render(this.gameCtx);
    },
    
    // Start new game
    startNewGame() {
        console.log('Starting new game');
        
        // Reset state
        GameState.reset();
        FrostingSystem.clear();
        DecorationSystem.clear();
        
        // Generate challenge
        GameState.currentChallenge = ChallengeGenerator.generateChallenge(GameState.currentLevel);
        console.log('Challenge:', GameState.currentChallenge);
        
        // Setup player cake from challenge
        GameState.playerCake.shape = GameState.currentChallenge.cakeShape;
        GameState.playerCake.layers = GameState.currentChallenge.layers;
        GameState.playerCake.creamColor = GameState.currentChallenge.creamColor;
        GameState.playerCake.frostingStyle = GameState.currentChallenge.frostingStyle;
        
        // Update UI
        UI.updateLevelDisplay(GameState.currentLevel);
        UI.updateTargetPreview(GameState.currentChallenge);
        UI.selectFrostingButton(GameState.playerCake.frostingStyle);
        
        // Show game screen
        UI.showScreen('game');
        
        // Initial render
        this.render();
    },
    
    // Select frosting style
    selectFrosting(style) {
        GameState.playerCake.frostingStyle = style;
        FrostingSystem.setStyle(style);
        GameState.selectedTool = 'frosting';
        UI.selectFrostingButton(style);
    },
    
    // Select decoration
    selectDecoration(type) {
        GameState.selectedTool = 'decoration';
        GameState.selectedDecoration = type;
        DecorationSystem.select(type);
        UI.selectDecorationButton(type);
    },
    
    // Place decoration on canvas click
    placeDecoration(x, y) {
        if (!GameState.selectedDecoration) return;
        
        GameState.saveState();
        const deco = DecorationSystem.place(GameState.selectedDecoration, x, y);
        
        if (deco) {
            GameState.playerCake.decorations.push(deco);
            this.render();
        }
    },
    
    // Undo last action
    undo() {
        if (GameState.undo()) {
            FrostingSystem.clear();
            DecorationSystem.clear();
            
            if (GameState.playerCake.frostingPaths) {
                FrostingSystem.setPaths(GameState.playerCake.frostingPaths);
            }
            
            if (GameState.playerCake.decorations) {
                DecorationSystem.set(GameState.playerCake.decorations);
            }
            
            this.render();
        }
    },
    
    // Finish current round
    finishRound() {
        console.log('Finishing round');
        
        // Save final state
        GameState.playerCake.frostingPaths = FrostingSystem.getPaths();
        GameState.playerCake.decorations = DecorationSystem.getAll();
        
        // Calculate score
        const score = ScoringSystem.calculateScore(
            GameState.currentChallenge,
            GameState.playerCake
        );
        
        GameState.lastScore = score;
        
        // Get feedback
        const feedback = ScoringSystem.getFeedback(score);
        GameState.lastFeedback = feedback;
        
        // Get breakdown
        const breakdown = ScoringSystem.getScoreBreakdown(
            GameState.currentChallenge,
            GameState.playerCake
        );
        
        // Show result
        UI.showResult(score, feedback, breakdown);
        
        // Add to total
        GameState.totalScore += score;
    },
    
    // Next challenge
    nextChallenge() {
        GameState.getNextLevel();
        this.startNewGame();
    }
};

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Game.init();
    });
} else {
    Game.init();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}
