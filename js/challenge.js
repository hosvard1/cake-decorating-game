/* ==================================================
   CHALLENGE GENERATOR
================================================== */

const ChallengeGenerator = {
    // Predefined compatible combinations
    compatibleCombinations: [
        {
            name: 'Classic Strawberry Dream',
            cakeShape: 'round',
            layers: 2,
            cakeColor: '#fff5e6',
            creamColor: '#ffb6c1',
            frostingStyle: 'smooth',
            decorations: {
                strawberries: { count: 5, style: 'scattered' },
                pearls: { count: 8, color: '#e0d5ff' },
                candles: 2
            },
            difficulty: 1
        },
        {
            name: 'Elegant Chocolate Celebration',
            cakeShape: 'round',
            layers: 3,
            cakeColor: '#d4a574',
            creamColor: '#8b4513',
            frostingStyle: 'spiral',
            decorations: {
                cherries: { count: 6, style: 'clustered' },
                chocolateCurls: { count: 15, style: 'scattered' },
                candles: 3
            },
            difficulty: 2
        },
        {
            name: 'Garden Rose Delight',
            cakeShape: 'round',
            layers: 2,
            cakeColor: '#fff5e6',
            creamColor: '#fff0f5',
            frostingStyle: 'rosette',
            decorations: {
                roses: { count: 8, color: '#ff69b4' },
                pearls: { count: 12, color: '#ffd700' },
                sprinkles: { count: 20, color: '#ffb6c1' }
            },
            difficulty: 2
        },
        {
            name: 'Blueberry Bliss',
            cakeShape: 'tall-round',
            layers: 3,
            cakeColor: '#fff5e6',
            creamColor: '#e6e6fa',
            frostingStyle: 'wavy',
            decorations: {
                blueberries: { count: 20, style: 'scattered' },
                raspberries: { count: 8, style: 'clustered' },
                pearls: { count: 10, color: '#dda0dd' }
            },
            difficulty: 2
        },
        {
            name: 'Birthday Sparkle',
            cakeShape: 'round',
            layers: 2,
            cakeColor: '#fff5e6',
            creamColor: '#ffb6c1',
            frostingStyle: 'piped',
            decorations: {
                sprinkles: { count: 30, color: '#ff1493' },
                pearls: { count: 15, color: '#ffd700' },
                candles: 4
            },
            difficulty: 3
        },
        {
            name: 'Peach Paradise',
            cakeShape: 'round',
            layers: 2,
            cakeColor: '#fff5e6',
            creamColor: '#ffe4b5',
            frostingStyle: 'smooth',
            decorations: {
                peaches: { count: 4, style: 'scattered' },
                strawberries: { count: 3, style: 'scattered' },
                sprinkles: { count: 15, color: '#ffa500' }
            },
            difficulty: 1
        },
        {
            name: 'Romantic Hearts',
            cakeShape: 'heart',
            layers: 2,
            cakeColor: '#fff5e6',
            creamColor: '#ffb6c1',
            frostingStyle: 'spiral',
            decorations: {
                hearts: { count: 12, color: '#ff1493' },
                pearls: { count: 10, color: '#ffd700' },
                roses: { count: 3, color: '#ff69b4' }
            },
            difficulty: 3
        },
        {
            name: 'Chocolate Drip Dream',
            cakeShape: 'tall-round',
            layers: 3,
            cakeColor: '#fff5e6',
            creamColor: '#ffb6c1',
            frostingStyle: 'drip',
            decorations: {
                chocolateChips: { count: 25, style: 'scattered' },
                sprinkles: { count: 20, color: '#8b4513' },
                candles: 2
            },
            difficulty: 3
        }
    ],
    
    // Generate a random challenge based on difficulty
    generateChallenge(level = 1) {
        // Difficulty increases with level
        let difficulty = Math.min(Math.ceil(level / 2), 3);
        
        // Filter combinations by difficulty
        let validCombinations = this.compatibleCombinations.filter(
            c => c.difficulty <= difficulty
        );
        
        if (validCombinations.length === 0) {
            validCombinations = this.compatibleCombinations;
        }
        
        // Pick random combination
        const challenge = validCombinations[
            Math.floor(Math.random() * validCombinations.length)
        ];
        
        return JSON.parse(JSON.stringify(challenge));
    },
    
    // Describe challenge in readable format
    describeChallengeAsText(challenge) {
        let description = `${challenge.name}\n\n`;
        description += `Create a ${challenge.layers}-layer ${challenge.cakeShape} cake with \n`;
        description += `${challenge.creamColor} frosting in ${challenge.frostingStyle} style.\n\n`;
        description += `Decorate with: `;
        
        const items = [];
        for (const [key, value] of Object.entries(challenge.decorations)) {
            if (key === 'candles' && value > 0) {
                items.push(`${value} candles`);
            } else if (key !== 'candles') {
                items.push(`${value.count} ${key}`);
            }
        }
        
        description += items.join(', ');
        
        return description;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChallengeGenerator;
}
