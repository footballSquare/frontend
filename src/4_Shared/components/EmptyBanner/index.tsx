import React from "react";

/**
 * Shades a hex color by a given percent.
 * Positive percent lightens, negative percent darkens.
 */
function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = num >> 16;
  const g = (num >> 8) & 0x00ff;
  const b = num & 0x0000ff;
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = Math.round((t - r) * p + r);
  const G = Math.round((t - g) * p + g);
  const B = Math.round((t - b) * p + b);
  const RR = (R < 16 ? "0" : "") + R.toString(16);
  const GG = (G < 16 ? "0" : "") + G.toString(16);
  const BB = (B < 16 ? "0" : "") + B.toString(16);
  return `#${RR}${GG}${BB}`;
}

interface EmptyBannerProps {
  text?: string;
  height?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textSize?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hexColor?: string;
}

const EmptyBanner = (props: EmptyBannerProps) => {
  const {
    text,
    height = "h-[200px]",
    gradientFrom = "from-blue-500",
    gradientTo = "to-green-500",
    textSize = "text-2xl sm:text-3xl",
    className = "",
    style = {},
    children,
    hexColor,
  } = props;

  let bgClass = `bg-gradient-to-r ${gradientFrom} ${gradientTo}`;
  let bgStyle: React.CSSProperties = style;

  if (hexColor) {
    const dark = shadeColor(hexColor, -60);
    const light = shadeColor(hexColor, 20);
    bgClass = "";
    bgStyle = {
      ...style,
      background: `linear-gradient(90deg, ${dark}, ${hexColor}, ${light})`,
    };
  }

  return (
    <div
      className={`w-full ${height} rounded-xl ${bgClass} flex items-center justify-center text-white ${textSize} font-bold shadow-md ${className}`}
      style={bgStyle}>
      {text || children}
    </div>
  );
};

export default EmptyBanner;
