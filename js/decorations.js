/* ==================================================
   DECORATION SYSTEM - FIXED
================================================== */

const DecorationSystem = {
    // Canvas context (shared from main game)
    ctx: null,
    canvas: null,
    
    // All available decorations with SVG definitions
    decorations: {
        strawberry: {
            name: 'Strawberry',
            category: 'fruits',
            size: 14,
            draw: function(ctx, x, y, size, color) {
                // Strawberry body
                ctx.fillStyle = color || '#e63946';
                ctx.beginPath();
                ctx.arc(x, y + 2, size * 0.6, 0, Math.PI * 2);
                ctx.fill();
                
                // Strawberry top (leaves)
                ctx.fillStyle = '#2d6a4f';
                for (let i = 0; i < 5; i++) {
                    const angle = (i / 5) * Math.PI * 2;
                    const leafX = x + Math.cos(angle) * size * 0.4;
                    const leafY = y - size * 0.5 + Math.sin(angle) * size * 0.3;
                    ctx.beginPath();
                    ctx.ellipse(leafX, leafY, size * 0.15, size * 0.25, angle, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Seeds
                ctx.fillStyle = 'rgba(255, 200, 100, 0.6)';
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const seedX = x + Math.cos(angle) * size * 0.3;
                    const seedY = y + 2 + Math.sin(angle) * size * 0.3;
                    ctx.beginPath();
                    ctx.arc(seedX, seedY, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        cherry: {
            name: 'Cherry',
            category: 'fruits',
            size: 10,
            draw: function(ctx, x, y, size, color) {
                // Cherry pair
                ctx.fillStyle = color || '#d62828';
                ctx.beginPath();
                ctx.arc(x - 4, y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 4, y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Stem
                ctx.strokeStyle = '#8b4513';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x, y - size * 0.5);
                ctx.quadraticCurveTo(x - 3, y - size * 1.2, x - 4, y - size * 1.5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y - size * 0.5);
                ctx.quadraticCurveTo(x + 3, y - size * 1.2, x + 4, y - size * 1.5);
                ctx.stroke();
            }
        },
        blueberry: {
            name: 'Blueberry',
            category: 'fruits',
            size: 8,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#4b0082';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
                ctx.fill();
                
                // Shine
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(x - 2, y - 2, size * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        raspberry: {
            name: 'Raspberry',
            category: 'fruits',
            size: 9,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#c41e3a';
                const segments = 8;
                for (let i = 0; i < segments; i++) {
                    const angle = (i / segments) * Math.PI * 2;
                    const bx = x + Math.cos(angle) * size * 0.4;
                    const by = y + Math.sin(angle) * size * 0.4;
                    ctx.beginPath();
                    ctx.arc(bx, by, size * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        peach: {
            name: 'Peach',
            category: 'fruits',
            size: 12,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#ffa500';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
                ctx.fill();
                
                // Peach indent
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(x, y + 2, size * 0.5, 0, Math.PI, false);
                ctx.stroke();
            }
        },
        pearl: {
            name: 'Pearl',
            category: 'sweets',
            size: 6,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#fff8dc';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Pearl shine
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(x - 2, y - 2, size * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        sprinkle: {
            name: 'Sprinkle',
            category: 'sweets',
            size: 3,
            draw: function(ctx, x, y, size, color) {
                ctx.strokeStyle = color || '#ff69b4';
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(x - 3, y);
                ctx.lineTo(x + 3, y);
                ctx.stroke();
            }
        },
        chocolateChip: {
            name: 'Chocolate Chip',
            category: 'sweets',
            size: 5,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#8b4513';
                ctx.beginPath();
                ctx.ellipse(x, y, size * 0.4, size * 0.6, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        chocolateCurl: {
            name: 'Chocolate Curl',
            category: 'sweets',
            size: 8,
            draw: function(ctx, x, y, size, color) {
                ctx.strokeStyle = color || '#8b4513';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.5, 0, Math.PI * 1.5, false);
                ctx.stroke();
            }
        },
        candle: {
            name: 'Candle',
            category: 'decorations',
            size: 16,
            draw: function(ctx, x, y, size, color) {
                // Candle stick
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(x - 2, y - size * 0.6, 4, size * 0.6);
                
                // Flame
                ctx.fillStyle = '#ff6b6b';
                ctx.beginPath();
                ctx.ellipse(x, y - size * 0.6 - 6, 3, 6, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Flame glow
                ctx.fillStyle = 'rgba(255, 107, 107, 0.2)';
                ctx.beginPath();
                ctx.ellipse(x, y - size * 0.6 - 6, 5, 8, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        heart: {
            name: 'Heart',
            category: 'decorations',
            size: 12,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#ff1493';
                ctx.beginPath();
                ctx.moveTo(x, y + size * 0.3);
                ctx.bezierCurveTo(
                    x - size * 0.5, y - size * 0.2,
                    x - size * 0.8, y,
                    x - size * 0.3, y + size * 0.4
                );
                ctx.bezierCurveTo(
                    x - size * 0.8, y,
                    x - size * 0.5, y - size * 0.2,
                    x, y + size * 0.3
                );
                ctx.fill();
            }
        },
        star: {
            name: 'Star',
            category: 'decorations',
            size: 10,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#ffd700';
                const spikes = 5;
                ctx.beginPath();
                for (let i = 0; i < spikes * 2; i++) {
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const radius = i % 2 === 0 ? size : size * 0.4;
                    const px = x + Math.cos(angle) * radius;
                    const py = y + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
            }
        },
        rose: {
            name: 'Rose',
            category: 'decorations',
            size: 14,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#ff69b4';
                const petals = 8;
                for (let i = 0; i < petals; i++) {
                    const angle = (i / petals) * Math.PI * 2;
                    const px = x + Math.cos(angle) * (size * 0.5);
                    const py = y + Math.sin(angle) * (size * 0.5);
                    ctx.beginPath();
                    ctx.ellipse(px, py, size * 0.4, size * 0.6, angle, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Center
                ctx.fillStyle = '#db2777';
                ctx.beginPath();
                ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        butterfly: {
            name: 'Butterfly',
            category: 'decorations',
            size: 12,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#a855f7';
                // Left wings
                ctx.beginPath();
                ctx.ellipse(x - 3, y - 2, size * 0.3, size * 0.4, -Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(x - 3, y + 2, size * 0.3, size * 0.4, Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                // Right wings
                ctx.beginPath();
                ctx.ellipse(x + 3, y - 2, size * 0.3, size * 0.4, Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(x + 3, y + 2, size * 0.3, size * 0.4, -Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
            }
        },
        bow: {
            name: 'Bow',
            category: 'decorations',
            size: 15,
            draw: function(ctx, x, y, size, color) {
                ctx.fillStyle = color || '#ff1493';
                // Left bow
                ctx.beginPath();
                ctx.ellipse(x - 5, y, size * 0.4, size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
                // Right bow
                ctx.beginPath();
                ctx.ellipse(x + 5, y, size * 0.4, size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
                // Center knot
                ctx.fillStyle = '#db2777';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    
    // Current selected decoration
    selectedDecoration: null,
    placedDecorations: [],
    selectedDecorationId: null,
    
    // Initialize system
    init(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx; // Use shared context from Game
        this.placedDecorations = [];
    },
    
    // Select a decoration type
    select(decorationType) {
        if (this.decorations[decorationType]) {
            this.selectedDecoration = decorationType;
            return true;
        }
        return false;
    },
    
    // Place a decoration
    place(type, x, y) {
        if (!this.decorations[type]) return null;
        
        const deco = {
            type: type,
            x: x,
            y: y,
            rotation: 0,
            scale: 1,
            id: Date.now() + Math.random()
        };
        
        this.placedDecorations.push(deco);
        return deco;
    },
    
    // Remove decoration by id
    remove(id) {
        this.placedDecorations = this.placedDecorations.filter(d => d.id !== id);
    },
    
    // Get decoration at position (for selection)
    getDecorationAt(x, y, radius = 20) {
        for (let i = this.placedDecorations.length - 1; i >= 0; i--) {
            const deco = this.placedDecorations[i];
            const dist = Math.sqrt((deco.x - x) ** 2 + (deco.y - y) ** 2);
            if (dist <= radius) {
                return deco;
            }
        }
        return null;
    },
    
    // Move decoration
    move(id, x, y) {
        const deco = this.placedDecorations.find(d => d.id === id);
        if (deco) {
            deco.x = x;
            deco.y = y;
        }
    },
    
    // Rotate decoration
    rotate(id, angle) {
        const deco = this.placedDecorations.find(d => d.id === id);
        if (deco) {
            deco.rotation = (deco.rotation + angle) % (Math.PI * 2);
        }
    },
    
    // Render all decorations using shared context
    render(ctx) {
        if (!ctx) ctx = this.ctx;
        if (!ctx) return;
        
        this.placedDecorations.forEach(deco => {
            ctx.save();
            ctx.translate(deco.x, deco.y);
            ctx.rotate(deco.rotation);
            ctx.scale(deco.scale, deco.scale);
            
            const decoration = this.decorations[deco.type];
            if (decoration && decoration.draw) {
                decoration.draw(ctx, 0, 0, decoration.size, null);
            }
            
            ctx.restore();
        });
    },
    
    // Get all placed decorations
    getAll() {
        return this.placedDecorations;
    },
    
    // Clear all decorations
    clear() {
        this.placedDecorations = [];
    },
    
    // Set decorations (for loading/undo)
    set(decorations) {
        this.placedDecorations = JSON.parse(JSON.stringify(decorations));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DecorationSystem;
}
