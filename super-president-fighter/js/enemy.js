//el malo del juego
class Enemy {
  constructor(w, h, ctx, keys) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = keys;
    this.x = this.canvasW * 0.85;

    // guardar posición original (suelo)
    this.y0 = this.canvasH * 0.40;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = "img/ken-shoryuken.png";

    // número de imágenes diferentes
    this.img.frames = 7;
    this.img.frameIndex = 0;

    // medidas de la imagen a representar en el canvas
    this.w = 180;
    this.h = 380;

    this.vy = 20;
    this.vx = 80;

    this.bullets = [];
  }

  draw(framesCounter) {
    // Documentación drawImage:
    // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateImg(framesCounter);

    this.bullets = this.bullets.filter(bullet => {
      return bullet.x < this.canvasW;
    });

    this.bullets.forEach(function (bullet) {
      bullet.drawLeft();
      bullet.moveLeft();
    });
  }

  setListeners() {
    document.onkeydown = function (event) {

      if (event.keyCode === 38) {
        console.log("Entro")
        this.y -= 5;
        this.vy -= 7;
      } else if (event.keyCode === this.keys.SPACE) {
        console.log("Entro")
        this.shoot();
      }
      else if (event.keyCode === 39) {
        this.moveRight();
      }
      else if (event.keyCode === this.keys.LEFT) {
        this.moveLeft();
      }
    }.bind(this);
  }

  shoot() {
    var bullet = new Bullet(
      this.x,
      this.y + this.h / 2,
      this.y0,
      this.h,
      this.ctx
    );

    this.bullets.push(bullet);
  }

  animateImg(framesCounter) {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (framesCounter % 7 === 0) {
      this.img.frameIndex += 1;

      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 6) this.img.frameIndex = 0;
    }
  }

  move() {
    // Aumenta la velocidad en el eje y.
    var gravity = 0.2;

    // solo salta cuando el personaje está en el suelo
    if (this.y >= this.y0) {
      this.vy = 0.5;
      this.y = this.y0;
    } else {
      this.vy += gravity;
      this.y += this.vy;
    }
  }

  moveLeft() {
    if (this.x > 0) this.x -= this.vx
  }

  moveRight() {
    if (this.x < this.canvasW - this.w) this.x += this.vx
  }
}



