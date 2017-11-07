export default function run(canvas) {
  const width = parseInt(canvas.getAttribute('width'), 10);
  const height = parseInt(canvas.getAttribute('height'), 10);
  const ctx = canvas.getContext('2d');
  ctx.fillRect(0, 0, width, height);
}