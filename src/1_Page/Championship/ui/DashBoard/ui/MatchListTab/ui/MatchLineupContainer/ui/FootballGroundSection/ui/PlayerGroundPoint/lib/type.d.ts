type PositionData = {
  positionIdx: number;
  top: string;
  left: string;
};

type CalculatePositionProps = {
  formation: number;
  playerPositionIdx: number;
  index: number;
  teamType: "home" | "away";
};

type CalculatedPositionReturn = {
  finalTop: number;
  finalLeft: number;
};
