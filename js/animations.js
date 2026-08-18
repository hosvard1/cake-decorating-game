/* ==================================================
   ANIMATION SYSTEM
================================================== */

const AnimationSystem = {
    animations: [],
    animationFrameId: null,
    
    // Add animation
    add(animation) {
        this.animations.push({
            startTime: Date.now(),
            duration: animation.duration || 500,
            callback: animation.callback,
            easing: animation.easing || this.easeInOutQuad,
            onComplete: animation.onComplete
        });
    },
    
    // Start animation loop
    start() {
        if (this.animationFrameId) return;
        
        const loop = () => {
            const now = Date.now();
            const toRemove = [];
            
            this.animations.forEach((anim, index) => {
                const elapsed = now - anim.startTime;
                const progress = Math.min(elapsed / anim.duration, 1);
                const easedProgress = anim.easing(progress);
                
                if (anim.callback) {
                    anim.callback(easedProgress);
                }
                
                if (progress >= 1) {
                    toRemove.push(index);
                    if (anim.onComplete) {
                        anim.onComplete();
                    }
                }
            });
            
            // Remove completed animations
            for (let i = toRemove.length - 1; i >= 0; i--) {
                this.animations.splice(toRemove[i], 1);
            }
            
            if (this.animations.length > 0) {
                this.animationFrameId = requestAnimationFrame(loop);
            } else {
                this.animationFrameId = null;
            }
        };
        
        this.animationFrameId = requestAnimationFrame(loop);
    },
    
    // Stop animations
    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.animations = [];
    },
    
    // Easing functions
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    
    easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    },
    
    easeInQuad(t) {
        return t * t;
    },
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    
    linear(t) {
        return t;
    },
    
    // Animate score counter
    animateScore(fromScore, toScore, duration, callback) {
        const startTime = Date.now();
        
        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentScore = Math.round(fromScore + (toScore - fromScore) * progress);
            
            if (callback) {
                callback(currentScore);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        update();
    },
    
    // Pulse animation
    animatePulse(element, duration = 300, callback) {
        const startTime = Date.now();
        
        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const scale = 1 + Math.sin(progress * Math.PI) * 0.1;
            
            if (element) {
                element.style.transform = `scale(${scale})`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else if (callback) {
                callback();
            }
        };
        
        update();
    },
    
    // Fade in animation
    animateFadeIn(element, duration = 300) {
        if (!element) return;
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },
    
    // Slide up animation
    animateSlideUp(element, duration = 400, distance = 30) {
        if (!element) return;
        element.style.transform = `translateY(${distance}px)`;
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 10);
    },
    
    // Pop in animation
    animatePopIn(element, duration = 400) {
        if (!element) return;
        element.style.transform = 'scale(0.85)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 10);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationSystem;
}
