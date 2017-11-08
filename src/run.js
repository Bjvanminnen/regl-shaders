import createREGL from 'regl';
import{ quad } from './utils';

function createRenderer(regl, dimensions) {
  const a_pos = quad(-1, 1, -1, 1);

  return regl({
    frag: require('./shaders/fragmentShader.glsl'),
    vert: `
    precision highp float;
    attribute vec2 a_pos;
    varying vec2 v_pos;
    void main() {
      v_pos = a_pos;
      gl_Position = vec4(a_pos, 0, 1);
    }
    `,
    attributes: {
      a_pos,
    },
    uniforms: {
      u_res: dimensions,
      u_time: regl.prop('time')
    },
    count: a_pos.length,
    depth: { enable: false }
  });
}

export default function run(canvas) {
  const regl = createREGL({
    canvas: canvas,
    attributes: {
      preserveDrawingBuffer: true
    }
  });

  const width = parseInt(canvas.getAttribute('width'), 10);
  const height = parseInt(canvas.getAttribute('height'), 10);
  const renderer = createRenderer(regl, [width, height]);

  regl.frame(({time}) => {
    renderer({
      time
    });
  });
}