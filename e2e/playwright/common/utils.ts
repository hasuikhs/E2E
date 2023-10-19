export function hexToRGB(hex: string) {
  hex = hex.replace(/^#/, '');

  const hexRegex = /^([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  if (!hexRegex.test(hex)) {
    throw new Error('Incorrect hex color format.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}
