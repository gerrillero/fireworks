import { canvas, particlesCount } from './constants.js';
import { Firework } from './particle.js';
import { Point } from './point.js';
import { Sound } from './sound.js';
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
        const soundA = new Sound('./resources/Loud-FireWorks-A.mp3');
        soundA.play();
        const soundB = new Sound('./resources/Loud-FireWorks-B.mp3');
        soundB.play();
        const sound = new Sound('./resources/fireworks-shower.mp3');
        sound.play();
        for (let index = 0; index < particlesCount; index++) {
            this.particles.push(this.createFirework(index));
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
    createFirework(index) {
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angleIncrement = (Math.PI * 2) / particlesCount;
        const power = 12;
        return new Firework(this.context, this.windowX, this.windowY, 3, new Point(Math.cos(angleIncrement * index) * Math.random() * power, Math.sin(angleIncrement * index) * Math.random() * power), color);
    }
}
