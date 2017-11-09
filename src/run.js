import createREGL from 'regl';
import { quad } from './utils';
import { playBuffer, getContext } from 'web-audio-utils';

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
      u_time: regl.prop('time'),
      u_sound: regl.prop('sound')
    },
    count: a_pos.length,
    depth: { enable: false }
  });
}

export default function run(canvas, soundBuffer) {
  const regl = createREGL({
    canvas: canvas,
    attributes: {
      preserveDrawingBuffer: true
    },
    optionalExtensions: ['oes_texture_float']
  });

  const audioCtx = getContext();

  const fullData = soundBuffer.getChannelData(0);

  const startTime = audioCtx.currentTime
  // playBuffer(soundBuffer);

  // const tex = regl.texture(data);

  const width = parseInt(canvas.getAttribute('width'), 10);
  const height = parseInt(canvas.getAttribute('height'), 10);
  const renderer = createRenderer(regl, [width, height]);

  // const data = new Float32Array([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1.]);
  // const sound = regl.texture(data);
  // TODO - better prob to just get audio data via analyzer node?
  const data = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1.];
  const sound = regl.texture({
    width: data.length,
    height: 1,
    data
  });

  // regl.frame(({time, tick}) => {
  //   if (tick % 3 !== 0) {
  //     return;
  //   }
  //   const index = (audioCtx.currentTime - startTime) * soundBuffer.sampleRate;
  //   // const data = fullData.subarray(index, index + 2048);


  //   renderer({
  //     time,
  //     sound
  //   });
  // });
}