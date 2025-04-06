export const getPositionColor = (position: number): string => {
  if (position === 0) {
    return "#F59E0B"; // yellow
  } else if (position >= 1 && position <= 7) {
    return "#3B82F6"; // blue
  } else if (position >= 8 && position <= 18) {
    return "#10B981"; // green
  } else if (position >= 19 && position <= 23) {
    return "#EF4444"; // red
  } else {
    return "#8B5CF6"; // purple
  }
};
