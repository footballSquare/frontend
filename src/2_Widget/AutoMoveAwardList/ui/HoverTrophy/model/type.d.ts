type UseHoverReturn = {
  isHovered: boolean;
  hoverPosition: { x: number; y: number };
  handleHover: () => void;
  handleMouseEnter: (event: React.MouseEvent) => void;
  handleMouseLeave: () => void;
};
