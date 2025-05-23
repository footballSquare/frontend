type ModalLayerProps = {
  children: React.ReactNode;
  toggleModalHandler: () => void;
  shape: "wide" | "narrow";
  mode: "dark" | "white";
};
