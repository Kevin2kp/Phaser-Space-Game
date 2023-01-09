export default class GeometryFactory {
  static equilateralTriangle(
      scale = 1, angle = 0, offsetX, offsetY) {
    let angle30Deg = 30 * Math.PI / 180;
    offsetX ??= 1 / 2;
    offsetY ??= -1 / (2 * Math.cos(angle30Deg));

    let verts = [
      0,
      -1 / (2 * Math.cos(angle30Deg)),
      1 / 2,
      Math.tan(angle30Deg) / 2,
      -1 / 2,
      Math.tan(angle30Deg) / 2,
    ];

    for (let i = 0; i < verts.length; i += 2) {
      console.log(`x: ${verts[i]}, y: ${verts[i + 1]}`);
      let transformedXY = Phaser.Math.TransformXY(verts[i], verts[i + 1],
          offsetX, offsetY, angle * Math.PI / 180, -1 / scale, 1 / scale);
      verts[i] = transformedXY.x;
      verts[i + 1] = transformedXY.y;
      console.log(`x: ${verts[i]}, y: ${verts[i + 1]}`);
    }

    return verts;
  }
}