precision highp float;
uniform vec2 u_res;

#pragma glslify: fbm = require(../lib/morganNoise.glsl)

void main() {
  // [0,1] with origin at bottom left
  vec2 st = gl_FragCoord.xy / u_res;
  vec3 color = vec3(0.);
  color.r = fbm(gl_FragCoord.xy / 80.);
  gl_FragColor = vec4(color, 1.0);
}