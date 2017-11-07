export function quad(left, right, top, bottom) {
  return [
    [left, bottom],
    [right, bottom],
    [right, top],

    [right, top],
    [left, bottom,],
    [left, top],
  ];
}

export const blend = {
  enable: true,
  func: {
    srcRGB: 'src alpha',
    srcAlpha: 1,
    dstRGB: 'one minus src alpha',
    dstAlpha: 1
  },
  equation: {
    rgb: 'add',
    alpha: 'add'
  },
};