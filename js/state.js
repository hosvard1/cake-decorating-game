/* ==================================================
   GAME STATE MANAGEMENT
================================================== */

const GameState = {
    // Game flow
    currentScreen: 'start', // start, game, result
    currentLevel: 1,
    completedRounds: 0,
    totalScore: 0,
    
    // Current challenge
    currentChallenge: null,
    
    // Player's cake
    playerCake: {
        shape: 'round',
        layers: 1,
        baseColor: '#fff5e6',
        cakeColors: [],
        creamType: 'smooth',
        creamColor: '#ffb6c1',
        frostingStyle: 'smooth',
        frostingPaths: [],
        toppings: [],
        decorations: [],
        candles: 0
    },
    
    // Interaction state
    selectedTool: null, // 'frosting', 'decoration', etc.
    selectedDecoration: null,
    isDrawing: false,
    undoStack: [],
    
    // Performance tracking
    lastScore: 0,
    lastFeedback: '',
    
    // UI state
    toolbarOpen: true,
    
    // Reset for new game
    reset() {
        this.playerCake = {
            shape: 'round',
            layers: 1,
            baseColor: '#fff5e6',
            cakeColors: [],
            creamType: 'smooth',
            creamColor: '#ffb6c1',
            frostingStyle: 'smooth',
            frostingPaths: [],
            toppings: [],
            decorations: [],
            candles: 0
        };
        this.selectedTool = null;
        this.selectedDecoration = null;
        this.isDrawing = false;
        this.undoStack = [];
    },
    
    // Save state for undo
    saveState() {
        this.undoStack.push(JSON.parse(JSON.stringify(this.playerCake)));
        if (this.undoStack.length > 20) {
            this.undoStack.shift();
        }
    },
    
    // Undo last action
    undo() {
        if (this.undoStack.length > 0) {
            this.playerCake = this.undoStack.pop();
            return true;
        }
        return false;
    },
    
    // Level management
    getNextLevel() {
        this.completedRounds++;
        if (this.completedRounds % 3 === 0) {
            this.currentLevel++;
        }
        return this.currentLevel;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameState;
}
