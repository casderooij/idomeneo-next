import Particle from './particle';
import { loadImage } from './utils';

const idomeneoText = '/images/background/idomeneo2.png';
const particleImage = '/images/background/particle4.png';

export default class SourceCanvas {
  constructor(size) {
    this.size = size;
    this.createCanvas();
    this.particles = [];

    loadImage(particleImage).then(image => {
      this.particles.push(new Particle({
        size,
        image,
        angle: Math.random() * (Math.PI * 2),
        angleSpeed: -0.004,
        radius: (Math.random() - 0.5) + 0.2
      }));

      this.particles.push(new Particle({
        size,
        image,
        angle: Math.random() * (Math.PI * 2),
        angleSpeed: 0.005,
        radius: (Math.random() - 0.5) + 0.2
      }));
    });

    loadImage(idomeneoText).then(image => {
      this.image = image;

      this.titleStartPos = this.size;
      this.titleYPos = Math.floor(this.titleStartPos - window.pageXOffset / this.scrollSpeed);
    });
  }

  createCanvas() {
    this.canvas = document.querySelector('#source-canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.ctx = this.canvas.getContext('2d');
  }
  
  update(tick) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08) ';
    this.ctx.fillRect(0, 0, this.size, this.size);
    
    this.particles.forEach(p => {
      p.draw(this.ctx);
      p.update(tick);
    });
    
    if (this.image) {
      this.ctx.drawImage(this.image, Math.cos(tick * 0.003) * 2, Math.sin(tick * 0.005) * 2, this.size, this.size);
    }
  }
}