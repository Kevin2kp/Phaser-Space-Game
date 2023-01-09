export const BulletProps = {
  speed: 300,
  drag: 10,
  width: 5,
  height: 20,
  lifeSpan: 10000
};

export function onBulletCollision(bullet, target){
  bullet.destroy();
  target.destroy();
}

export function die(){
  this.destroy();
}