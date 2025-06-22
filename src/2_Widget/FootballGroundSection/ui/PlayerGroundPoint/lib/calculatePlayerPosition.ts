import { formations } from "../../../../../2_Widget/MatchModal/constant/formation";

export const calculatePlayerPosition = (
  props: CalculatePositionProps
): CalculatedPositionReturn => {
  const { formation, playerPositionIdx, index, teamType } = props;
  const formationData = formations[formation || 0] || formations[0];
  let position: PositionData | undefined = formationData.find(
    (f: PositionData) => f.positionIdx === playerPositionIdx
  );

  if (!position) {
    position = {
      positionIdx: playerPositionIdx,
      top: teamType === "home" ? "85%" : "15%",
      left: `${10 + (index % 8) * 10}%`,
    };
  }

  const originalTop = parseFloat(position.top);
  const originalLeft = parseFloat(position.left);

  if (teamType === "home") {
    // 홈팀: Y축 반전, 상위 50% 영역에만 제한
    const flippedTop = 100 - originalTop;
    const finalTop = Math.max(5, Math.min(45, flippedTop * 0.5));
    return { finalTop, finalLeft: originalLeft };
  } else {
    // 어웨이팀: 하위 50% 영역에만 제한 (55% ~ 95%)
    const finalTop = Math.max(55, Math.min(95, 50 + originalTop * 0.5));
    return { finalTop, finalLeft: originalLeft };
  }
};
