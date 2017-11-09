precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform sampler2D u_sound;

#pragma glslify: fbm = require(../lib/morganNoise.glsl)

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float rand(float x) {
  return rand(vec2(x));
}

void main() {
  // [0,1] with origin at bottom left
  vec2 st = gl_FragCoord.xy / u_res;
  vec3 color = vec3(0.);

  vec2 noise_seed = gl_FragCoord.xy;
  noise_seed.x += fbm(st + u_time) * 20.;
  color.r = fbm(noise_seed / 80.);

  gl_FragColor = vec4(color, 1.0);
}