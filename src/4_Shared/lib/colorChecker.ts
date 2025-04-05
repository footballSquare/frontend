export const getTextColorFromBackground = (hexColor: string) => {
  if (!hexColor) return "black";
  const color = hexColor.replace("#", "");

  // 각 자리 수에서 R, G, B를 16진수 -> 10진수로 변환
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // 가중치가 높은 G 값이 사람의 시각에 더 큰 영향.
  // 일반적 기준으로 128 전후로 밝기 판별
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기가 128 이상이면 어두운 글자(#000) 사용, 아니면 밝은 글자(#fff) 사용
  return yiq >= 128 ? "#000000" : "#ffffff";
};
