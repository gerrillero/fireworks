import { canvas, particlesCount } from './constants.js';
import { Firework } from './firework.js';
import { Point } from './point.js';
import { Sound } from './sound.js';

export class Canvas {
    context: CanvasRenderingContext2D;
    requestAnimateId: number;
    particles: Firework[] = [];
    windowX: number;
    windowY: number;

    constructor() {
        canvas.width = innerWidth;
        canvas.height = innerHeight
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

        // fireworkSoundA.play();
        // fireworkSoundB.play();
        for (let index = 0; index < particlesCount; index++) {
            this.particles.push(this.createFirework(index));
        }
    }

    setCoordenades(event: MouseEvent) {
        this.windowX = event.clientX;
        this.windowY = event.clientY;
        console.log(this.windowX);
    }

    private animate() {
        this.requestAnimateId = requestAnimationFrame(this.animate.bind(this));

        // clearRect make a white background
        //this.context.clearRect(0, 0, canvas.width, canvas.height);

        // So, we do with fillRect and fillStyle with opacity to get a moving/speed efect.
        this.context.fillStyle = 'rgba(0,0,0,0.1';
        this.context.fillRect(0, 0, canvas.width, canvas.height);


        this.particles.forEach((particle, index) => {
            if (particle.alpha > 0)
                particle.update();
            else
                this.particles.splice(index, 1);
        });
    }

    private createFirework(index: number): Firework {
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angleIncrement: number = (Math.PI * 2) / particlesCount;
        const power: number = 12;
        return new Firework(
            this.context,
            this.windowX,
            this.windowY,
            3,
            new Point(Math.cos(angleIncrement * index) * Math.random() * power, Math.sin(angleIncrement * index) * Math.random() * power), color);
    }
}