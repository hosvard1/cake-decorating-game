/* ==================================================
   FROSTING/CREAM SYSTEM
================================================== */

const FrostingSystem = {
    // Canvas context and state
    ctx: null,
    canvas: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    frostingPaths: [],
    
    // Frosting properties
    currentStyle: 'smooth',
    currentColor: '#ffb6c1',
    brushSize: 12,
    pressure: 1,
    
    // Initialize frosting system
    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.frostingPaths = [];
    },
    
    // Set frosting style
    setStyle(style) {
        this.currentStyle = style;
    },
    
    // Set frosting color
    setColor(color) {
        this.currentColor = color;
    },
    
    // Start drawing frosting
    startDrawing(x, y) {
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
        this.frostingPaths.push({
            points: [{x, y}],
            style: this.currentStyle,
            color: this.currentColor,
            size: this.brushSize
        });
    },
    
    // Continue drawing frosting with smooth interpolation
    draw(x, y) {
        if (!this.isDrawing || this.frostingPaths.length === 0) return;
        
        const currentPath = this.frostingPaths[this.frostingPaths.length - 1];
        
        // Interpolate points for smooth path
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(distance / 2);
        
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const interpX = this.lastX + dx * t;
            const interpY = this.lastY + dy * t;
            currentPath.points.push({x: interpX, y: interpY});
        }
        
        this.lastX = x;
        this.lastY = y;
    },
    
    // Stop drawing frosting
    stopDrawing() {
        this.isDrawing = false;
    },
    
    // Render all frosting paths
    render() {
        this.frostingPaths.forEach(path => {
            this.renderPath(path);
        });
    },
    
    // Render a single frosting path
    renderPath(path) {
        if (path.points.length < 2) return;
        
        switch (path.style) {
            case 'smooth':
                this.renderSmoothFrosting(path);
                break;
            case 'spiral':
                this.renderSpiralFrosting(path);
                break;
            case 'piped':
                this.renderPipedFrosting(path);
                break;
            case 'rosette':
                this.renderRosetteFrosting(path);
                break;
            case 'wavy':
                this.renderWavyFrosting(path);
                break;
            case 'drip':
                this.renderDripFrosting(path);
                break;
        }
    },
    
    // Smooth frosting - continuous ribbon with highlights
    renderSmoothFrosting(path) {
        this.ctx.globalAlpha = 0.95;
        this.ctx.fillStyle = path.color;
        this.ctx.strokeStyle = path.color;
        this.ctx.lineWidth = path.size;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        
        // Main frosting stroke
        this.ctx.beginPath();
        this.ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
            this.ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        this.ctx.stroke();
        
        // Add highlight
        this.ctx.globalAlpha = 0.3;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.lineWidth = path.size * 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(path.points[0].x - 2, path.points[0].y - 2);
        for (let i = 1; i < path.points.length; i++) {
            this.ctx.lineTo(path.points[i].x - 2, path.points[i].y - 2);
        }
        this.ctx.stroke();
        
        this.ctx.globalAlpha = 1;
    },
    
    // Spiral frosting
    renderSpiralFrosting(path) {
        this.ctx.globalAlpha = 0.9;
        
        path.points.forEach((point, index) => {
            const angle = (index / path.points.length) * Math.PI * 4;
            const offsetX = Math.cos(angle) * 3;
            const offsetY = Math.sin(angle) * 3;
            
            this.ctx.fillStyle = path.color;
            this.ctx.beginPath();
            this.ctx.arc(point.x + offsetX, point.y + offsetY, path.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    },
    
    // Piped frosting - small dots
    renderPipedFrosting(path) {
        this.ctx.globalAlpha = 0.9;
        this.ctx.fillStyle = path.color;
        
        for (let i = 0; i < path.points.length; i += 2) {
            const point = path.points[i];
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, path.size / 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(point.x - 1, point.y - 1, path.size / 6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = path.color;
        }
        
        this.ctx.globalAlpha = 1;
    },
    
    // Rosette frosting
    renderRosetteFrosting(path) {
        this.ctx.globalAlpha = 0.88;
        
        for (let i = 0; i < path.points.length; i += 3) {
            const point = path.points[i];
            const petalCount = 6;
            
            for (let p = 0; p < petalCount; p++) {
                const angle = (p / petalCount) * Math.PI * 2;
                const petalX = point.x + Math.cos(angle) * (path.size * 0.6);
                const petalY = point.y + Math.sin(angle) * (path.size * 0.4);
                
                this.ctx.fillStyle = path.color;
                this.ctx.beginPath();
                this.ctx.ellipse(petalX, petalY, path.size * 0.5, path.size * 0.7, angle, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        this.ctx.globalAlpha = 1;
    },
    
    // Wavy frosting
    renderWavyFrosting(path) {
        this.ctx.globalAlpha = 0.92;
        this.ctx.fillStyle = path.color;
        
        this.ctx.beginPath();
        for (let i = 0; i < path.points.length; i++) {
            const point = path.points[i];
            const wave = Math.sin((i / path.points.length) * Math.PI * 4) * 3;
            if (i === 0) this.ctx.moveTo(point.x, point.y + wave);
            else this.ctx.lineTo(point.x, point.y + wave);
        }
        
        // Close path for fill
        if (path.points.length > 0) {
            const lastPoint = path.points[path.points.length - 1];
            this.ctx.lineTo(lastPoint.x, lastPoint.y + path.size);
            this.ctx.lineTo(path.points[0].x, path.points[0].y + path.size);
            this.ctx.closePath();
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
    },
    
    // Drip frosting
    renderDripFrosting(path) {
        this.ctx.globalAlpha = 0.87;
        this.ctx.fillStyle = path.color;
        
        path.points.forEach((point, index) => {
            // Main drip blob
            this.ctx.beginPath();
            this.ctx.ellipse(point.x, point.y, path.size * 0.8, path.size * 1.2, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Drip tail
            if (index % 2 === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(point.x, point.y + path.size * 0.6);
                this.ctx.lineTo(point.x - 2, point.y + path.size * 1.8);
                this.ctx.lineTo(point.x + 2, point.y + path.size * 1.8);
                this.ctx.fill();
            }
        });
        
        this.ctx.globalAlpha = 1;
    },
    
    // Get frosting paths data
    getPaths() {
        return this.frostingPaths;
    },
    
    // Set frosting paths (for loading/undoing)
    setPaths(paths) {
        this.frostingPaths = JSON.parse(JSON.stringify(paths));
    },
    
    // Clear all frosting
    clear() {
        this.frostingPaths = [];
    },
    
    // Remove last frosting stroke
    removeLast() {
        if (this.frostingPaths.length > 0) {
            this.frostingPaths.pop();
            return true;
        }
        return false;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrostingSystem;
}
