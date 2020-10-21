import { canvas, fireworkSound, fireworkSoundA, fireworkSoundB, particlesCount } from './constants.js';
import { Particle } from './particle.js';
import { Point } from './point.js';
export class Canvas {
    constructor() {
        this.particles = [];
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        this.context = canvas.getContext('2d');
    }
    init() {
        this.animate();
    }
    addParticles() {
        fireworkSound.play();
        fireworkSoundA.play();
        fireworkSoundB.play();
        for (let index = 0; index < particlesCount; index++) {
            this.particles.push(this.createParticle(index));
        }
    }
    setCoordenades(event) {
        this.windowX = event.clientX;
        this.windowY = event.clientY;
        console.log(this.windowX);
    }
    animate() {
        this.requestAnimateId = requestAnimationFrame(this.animate.bind(this));
        this.context.fillStyle = 'rgba(0,0,0,0.1';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
        this.particles.forEach((particle, index) => {
            if (particle.alpha > 0)
                particle.update();
            else
                this.particles.splice(index, 1);
        });
    }
    createParticle(index) {
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angleIncrement = (Math.PI * 2) / particlesCount;
        const power = 8;
        return new Particle(this.context, this.windowX, this.windowY, 3, new Point(Math.cos(angleIncrement * index) * Math.random() * power, Math.sin(angleIncrement * index) * Math.random() * power), color);
    }
}
