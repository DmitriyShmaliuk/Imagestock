export function getSectionStyle(position, gridBlocks) {
  if (position === 1) {
    return {
      gridColumnStart: 5 * (gridBlocks - 1),
      gridColumnEnd: 5 * (gridBlocks - 1) + 2,
    };
  } else if (position === 5) {
    return {
      gridColumnStart: 6 * (gridBlocks - 1),
      gridColumnEnd: 6 * (gridBlocks - 1) + 2,
      gridRowStart: 3,
      gridRowEnd: 4,
    };
  } else if (position === 6) {
    return {
      gridColumnStart: 7 * (gridBlocks - 1),
      gridColumnEnd: 7 * (gridBlocks - 1),
      gridRowStart: 1,
      gridRowEnd: 3,
    };
  }
}
