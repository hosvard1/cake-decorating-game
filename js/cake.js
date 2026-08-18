/* ==================================================
   CAKE RENDERING SYSTEM
================================================== */

const CakeRenderer = {
    // Canvas context
    ctx: null,
    canvas: null,
    
    // Initialize renderer
    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.setupCanvas();
    },
    
    // Setup canvas resolution
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    },
    
    // Clear canvas
    clear() {
        this.ctx.fillStyle = 'rgba(0,0,0,0)';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    // Draw a complete cake
    drawCake(cakeData) {
        this.clear();
        
        const centerX = this.canvas.width / 2;
        const baseY = this.canvas.height - 60;
        
        // Draw base plate
        this.drawPlate(centerX, baseY);
        
        // Draw layers based on shape
        switch (cakeData.shape) {
            case 'round':
                this.drawRoundLayers(cakeData, centerX, baseY);
                break;
            case 'tall-round':
                this.drawTallRoundLayers(cakeData, centerX, baseY);
                break;
            case 'heart':
                this.drawHeartLayers(cakeData, centerX, baseY);
                break;
            default:
                this.drawRoundLayers(cakeData, centerX, baseY);
        }
        
        // Draw candles if any
        if (cakeData.candles && cakeData.candles > 0) {
            this.drawCandles(cakeData.candles, centerX, baseY - (cakeData.layers * 35));
        }
    },
    
    // Draw decorative plate
    drawPlate(x, y) {
        // Shadow
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 8, 110, 30, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Plate
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 110, 30, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Plate shine
        this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 10, 90, 20, 0, 0, Math.PI * 2);
        this.ctx.fill();
    },
    
    // Draw round cake layers
    drawRoundLayers(cakeData, centerX, baseY) {
        const layerHeight = 35;
        const layerWidth = 120;
        
        for (let i = cakeData.layers - 1; i >= 0; i--) {
            const y = baseY - (i * layerHeight);
            const width = layerWidth - (i * 15);
            const height = layerHeight - 8;
            
            // Layer shadow
            this.ctx.fillStyle = 'rgba(0,0,0,0.08)';
            this.ctx.beginPath();
            this.ctx.ellipse(centerX, y + 2, width / 2, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Layer cake
            this.ctx.fillStyle = cakeData.cakeColor || '#f5deb3';
            this.ctx.fillRect(
                centerX - width / 2,
                y - height / 2,
                width,
                height
            );
            
            // Layer border
            this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(
                centerX - width / 2,
                y - height / 2,
                width,
                height
            );
            
            // Add cream layer separator
            if (i < cakeData.layers - 1) {
                this.drawCreamLayer(centerX, y + height / 2, width, cakeData.creamColor);
            }
        }
        
        // Add frosting on top
        if (cakeData.frostingPaths.length === 0) {
            this.drawDefaultFrosting(centerX, baseY - (cakeData.layers * layerHeight), layerWidth - (cakeData.layers * 15), cakeData.creamColor, cakeData.frostingStyle);
        }
    },
    
    // Draw tall round cake
    drawTallRoundLayers(cakeData, centerX, baseY) {
        const layerHeight = 40;
        const layerWidth = 140;
        
        for (let i = cakeData.layers - 1; i >= 0; i--) {
            const y = baseY - (i * layerHeight);
            const width = layerWidth - (i * 12);
            const height = layerHeight - 5;
            
            this.ctx.fillStyle = 'rgba(0,0,0,0.08)';
            this.ctx.beginPath();
            this.ctx.ellipse(centerX, y + 2, width / 2, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.fillStyle = cakeData.cakeColor || '#f5deb3';
            this.ctx.fillRect(
                centerX - width / 2,
                y - height / 2,
                width,
                height
            );
            
            this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(
                centerX - width / 2,
                y - height / 2,
                width,
                height
            );
            
            if (i < cakeData.layers - 1) {
                this.drawCreamLayer(centerX, y + height / 2, width, cakeData.creamColor);
            }
        }
        
        if (cakeData.frostingPaths.length === 0) {
            this.drawDefaultFrosting(centerX, baseY - (cakeData.layers * layerHeight), layerWidth - (cakeData.layers * 12), cakeData.creamColor, cakeData.frostingStyle);
        }
    },
    
    // Draw heart-shaped cake
    drawHeartLayers(cakeData, centerX, baseY) {
        const layerHeight = 35;
        const scale = 1.0 - (0.2 * 0);
        
        for (let i = cakeData.layers - 1; i >= 0; i--) {
            const y = baseY - (i * layerHeight);
            const localScale = scale - (i * 0.15);
            
            // Simple heart shape approximation with rounded rectangle
            this.ctx.fillStyle = cakeData.cakeColor || '#f5deb3';
            this.drawRoundedRect(centerX - 50 * localScale, y - 30 * localScale, 100 * localScale, 60 * localScale, 20);
            this.ctx.fill();
            
            this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        
        if (cakeData.frostingPaths.length === 0) {
            this.drawDefaultFrosting(centerX, baseY - (cakeData.layers * layerHeight) - 20, 80, cakeData.creamColor, cakeData.frostingStyle);
        }
    },
    
    // Draw cream layer separator
    drawCreamLayer(x, y, width, creamColor) {
        this.ctx.fillStyle = creamColor;
        this.ctx.fillRect(x - width / 2, y - 3, width, 6);
        
        // Cream shine
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.fillRect(x - width / 2, y - 2, width, 2);
    },
    
    // Draw default frosting top
    drawDefaultFrosting(x, y, width, creamColor, style) {
        const height = 30;
        
        this.ctx.fillStyle = creamColor;
        
        switch (style) {
            case 'smooth':
                this.ctx.beginPath();
                this.ctx.ellipse(x, y - height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
                this.ctx.fill();
                break;
            case 'spiral':
                this.drawSpiralPattern(x, y, width, creamColor);
                break;
            case 'rosette':
                this.drawRosettePattern(x, y, width, creamColor);
                break;
            case 'wavy':
                this.drawWavyPattern(x, y, width, creamColor);
                break;
            case 'piped':
                this.drawPipedPattern(x, y, width, creamColor);
                break;
            case 'drip':
                this.drawDripPattern(x, y, width, creamColor);
                break;
        }
        
        // Frosting shine
        this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
        this.ctx.beginPath();
        this.ctx.ellipse(x - 5, y - 8, 20, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
    },
    
    // Pattern methods for different frosting styles
    drawSpiralPattern(x, y, width, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 4;
            const radius = (width / 2) * (i / 20);
            const px = x + Math.cos(angle) * radius;
            const py = y - 15 + Math.sin(angle) * radius;
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.fill();
    },
    
    drawRosettePattern(x, y, width, color) {
        this.ctx.fillStyle = color;
        const petalCount = 8;
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const px = x + Math.cos(angle) * (width / 3);
            const py = y - 10 + Math.sin(angle) * 10;
            this.ctx.beginPath();
            this.ctx.ellipse(px, py, 12, 15, angle, 0, Math.PI * 2);
            this.ctx.fill();
        }
    },
    
    drawWavyPattern(x, y, width, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const points = 8;
        for (let i = 0; i <= points; i++) {
            const px = x - width / 2 + (i / points) * width;
            const py = y - 15 + Math.sin((i / points) * Math.PI * 2) * 8;
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.lineTo(x + width / 2, y + 5);
        this.ctx.lineTo(x - width / 2, y + 5);
        this.ctx.fill();
    },
    
    drawPipedPattern(x, y, width, color) {
        this.ctx.fillStyle = color;
        const rows = 4;
        const cols = 6;
        const spacing = width / (cols + 1);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const px = x - width / 2 + spacing * (col + 1);
                const py = y - 18 + row * 5;
                this.ctx.beginPath();
                this.ctx.arc(px, py, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    },
    
    drawDripPattern(x, y, width, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 15, width / 2, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Drips
        const dripCount = 4;
        for (let i = 0; i < dripCount; i++) {
            const dripX = x - width / 4 + (i / (dripCount - 1)) * (width / 2);
            this.ctx.beginPath();
            this.ctx.moveTo(dripX, y);
            this.ctx.lineTo(dripX - 2, y + 10);
            this.ctx.lineTo(dripX + 2, y + 10);
            this.ctx.fill();
        }
    },
    
    // Draw candles
    drawCandles(count, centerX, topY) {
        const candleWidth = 8;
        const candleHeight = 25;
        const totalWidth = count * candleWidth * 2;
        const startX = centerX - totalWidth / 2;
        
        for (let i = 0; i < count; i++) {
            const x = startX + i * (candleWidth * 2) + candleWidth;
            const y = topY;
            
            // Candle stick
            this.ctx.fillStyle = '#ffd700';
            this.ctx.fillRect(x - candleWidth / 2, y - candleHeight, candleWidth, candleHeight);
            
            // Flame
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.ellipse(x, y - candleHeight - 8, 4, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Flame glow
            this.ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(x, y - candleHeight - 8, 6, 10, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
    },
    
    // Utility: draw rounded rectangle
    drawRoundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CakeRenderer;
}
