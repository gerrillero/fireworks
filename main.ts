import { Canvas } from "./canvas.js";

const canvas = new Canvas();
canvas.init();

window.addEventListener('mousemove', (event) => { canvas.setCoordenades(event); })
window.addEventListener('click', () => { canvas.addFireworks(); });
