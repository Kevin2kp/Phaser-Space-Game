export default {
  width: 800, height: 800,
  centerX() {
    return this.width / 2;
  },
  centerY() {
    return this.height / 2;
  },
  randomPos() {
    return new Phaser.Math.Vector2(Math.random() * this.width,
        Math.random() * this.height);
  },
};
