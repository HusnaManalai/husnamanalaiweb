const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null };

// Track mouse position
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Preload particle images
const images = [];
for (let i = 1; i <= 12; i++) { // Load 5 images
  const img = new Image();
  img.src = `images/${i}.png`;
  images.push(img);
}

// Particle class
class Particle {
  constructor(x, y, size, image, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw() {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.size *= 0.99;
  }
}

// Array to store particles
const particles = [];

function createParticle(x, y) {
  const size = Math.random() * 20 + 10;
  const image = images[Math.floor(Math.random() * images.length)];
  const velocityX = Math.random() * 2 - 1;
  const velocityY = Math.random() * 2 - 1;
  particles.push(new Particle(x, y, size, image, velocityX, velocityY));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.x && mouse.y) {
    createParticle(mouse.x, mouse.y);
  }

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size < 1) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
