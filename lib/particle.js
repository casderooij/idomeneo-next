export default class Particle {
  constructor({ ...options }) {
    this.radius = 0.5 || options.radius;
    this.radiusSpeed = (Math.random() - 0.5) * 0.01 || options.radiusSpeed;

    this.angle = options.angle;
    // this.angleSpeed = (Math.random() - 0.5) * 0.06 || options.angleSpeed;
    this.angleSpeed = options.angleSpeed;

    this.canvasSize = options.size;
    this.image = options.image;
    this.imageSize = this.image.width * 2;

    this.scale = (0.03 || options.scale) * this.canvasSize;
    this.position = {
      x: Math.floor(this.canvasSize / 2 - (Math.cos(this.angle) * this.radius) * this.canvasSize - ((this.imageSize * this.scale) / 2)),
      y: Math.floor(this.canvasSize / 2 - (Math.sin(this.angle) * this.radius) * this.canvasSize - ((this.imageSize * this.scale) / 2)),
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.canvasSize / 2 - (Math.cos(this.angle) * this.radius) * this.canvasSize - ((this.imageSize * this.scale) / 2),
      this.canvasSize / 2 - (Math.sin(this.angle) * this.radius) * this.canvasSize - ((this.imageSize * this.scale) / 2),
      this.imageSize * this.scale,
      this.imageSize * this.scale
    );
  }

  update(tick) {
    this.angle += this.angleSpeed;
    this.radius = Math.cos(tick * this.radiusSpeed);
  }
}