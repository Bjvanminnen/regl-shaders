import createREGL from 'regl';

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

function createRenderer(regl, dimensions) {
  const a_pos = quad(-1, 1, -1, 1);

  return regl({
    frag: `
    precision highp float;
    uniform vec2 u_res;
    void main() {
      // [0,1] with origin at bottom left
      vec2 st = gl_FragCoord.xy / u_res;
      vec3 color = vec3(0.);
      color.r = st.x;
      gl_FragColor = vec4(color, 1.0);
    }
    `,
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
    },
    count: a_pos.length,
    // blend: {
    //   enable: true,
    //   func: {
    //     srcRGB: 'src alpha',
    //     srcAlpha: 1,
    //     dstRGB: 'one minus src alpha',
    //     dstAlpha: 1
    //   },
    //   equation: {
    //     rgb: 'add',
    //     alpha: 'add'
    //   },
    // },
    // depth: { enable: false }
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

  renderer();
}