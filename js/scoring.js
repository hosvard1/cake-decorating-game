/* ==================================================
   SCORING SYSTEM
================================================== */

const ScoringSystem = {
    // Calculate score based on cake comparison
    calculateScore(targetCake, playerCake) {
        let score = 0;
        const weights = {
            shape: 0.20,
            color: 0.10,
            cream: 0.20,
            frostingStyle: 0.15,
            toppings: 0.15,
            decorations: 0.10,
            placement: 0.10
        };
        
        // Shape match (20%)
        const shapeMatch = targetCake.shape === playerCake.shape ? 100 : 60;
        score += shapeMatch * weights.shape;
        
        // Color match (10%)
        const colorMatch = this.colorSimilarity(
            targetCake.cakeColor,
            playerCake.cakeColor
        ) * 100;
        score += colorMatch * weights.color;
        
        // Cream/frosting coverage (20%)
        const creamCoverage = Math.min(
            (playerCake.frostingPaths.length * 15) / 100,
            100
        );
        score += creamCoverage * weights.cream;
        
        // Frosting style match (15%)
        const styleMatch = targetCake.frostingStyle === playerCake.frostingStyle ? 100 : 40;
        score += styleMatch * weights.frostingStyle;
        
        // Toppings/layers match (15%)
        const layersMatch = targetCake.layers === playerCake.layers ? 100 : 60;
        score += layersMatch * weights.toppings;
        
        // Decorations count (10%)
        const targetDecoCount = this.countTargetDecorations(targetCake);
        const playerDecoCount = playerCake.decorations.length;
        const decoMatch = Math.min(
            (playerDecoCount / Math.max(targetDecoCount, 1)) * 100,
            100
        );
        score += decoMatch * weights.decorations;
        
        // Decoration placement (10%)
        const placementScore = this.calculatePlacementScore(
            playerCake.decorations
        );
        score += placementScore * weights.placement;
        
        return Math.min(Math.round(score), 100);
    },
    
    // Compare colors (0 to 1)
    colorSimilarity(color1, color2) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return 0.5;
        
        const dr = rgb1.r - rgb2.r;
        const dg = rgb1.g - rgb2.g;
        const db = rgb1.b - rgb2.b;
        
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);
        const maxDistance = Math.sqrt(255 * 255 * 3);
        
        return 1 - (distance / maxDistance);
    },
    
    // Convert hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    // Count decorations in target
    countTargetDecorations(targetCake) {
        let count = 0;
        if (targetCake.decorations) {
            for (const [key, value] of Object.entries(targetCake.decorations)) {
                if (key === 'candles') {
                    count += value;
                } else if (value.count) {
                    count += value.count;
                }
            }
        }
        return count;
    },
    
    // Calculate placement quality (0 to 100)
    calculatePlacementScore(decorations) {
        if (decorations.length === 0) return 50;
        
        // Check if decorations are spread evenly
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        
        decorations.forEach(deco => {
            minX = Math.min(minX, deco.x);
            maxX = Math.max(maxX, deco.x);
            minY = Math.min(minY, deco.y);
            maxY = Math.max(maxY, deco.y);
        });
        
        // Wider spread = better placement
        const spread = (maxX - minX) + (maxY - minY);
        return Math.min((spread / 200) * 100, 100);
    },
    
    // Get feedback message based on score
    getFeedback(score) {
        if (score >= 95) return "🌟 Perfect! You're a master baker!";
        if (score >= 85) return "✨ Excellent work! Almost flawless!";
        if (score >= 75) return "🎉 Great job! Very impressive!";
        if (score >= 65) return "👏 Good effort! Nice decoration!";
        if (score >= 50) return "😊 Not bad! Keep practicing!";
        return "🎂 Keep trying! You'll improve!";
    },
    
    // Get score breakdown for display
    getScoreBreakdown(targetCake, playerCake) {
        const weights = {
            'Cake Shape': { value: targetCake.shape === playerCake.shape ? 20 : 12, max: 20 },
            'Cake Color': { value: Math.round(this.colorSimilarity(targetCake.cakeColor, playerCake.cakeColor) * 10), max: 10 },
            'Frosting': { value: Math.min(playerCake.frostingPaths.length * 2, 20), max: 20 },
            'Frosting Style': { value: targetCake.frostingStyle === playerCake.frostingStyle ? 15 : 6, max: 15 },
            'Layers': { value: targetCake.layers === playerCake.layers ? 15 : 9, max: 15 },
            'Decorations': { value: Math.min(playerCake.decorations.length * 2, 10), max: 10 },
            'Placement': { value: Math.min(playerCake.decorations.length, 10), max: 10 }
        };
        
        return weights;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScoringSystem;
}
