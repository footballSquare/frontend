export const getPositionColor = (position: number) => {
  const positionColors: { [key: string]: string } = {
    GK: "bg-yellow-500",
    DF: "bg-blue-500",
    MF: "bg-green-500",
    FW: "bg-red-500",
    default: "bg-purple-500",
  };

  let mainPos: string;

  if (position === 0) {
    mainPos = "GK";
  } else if (position >= 1 && position <= 7) {
    mainPos = "DF";
  } else if (position >= 8 && position <= 18) {
    mainPos = "MF";
  } else if (position >= 19 && position <= 23) {
    mainPos = "FW";
  } else {
    mainPos = "default";
  }

  return positionColors[mainPos];
};
