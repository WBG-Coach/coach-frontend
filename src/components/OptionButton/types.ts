import {
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  value: string;
  icon?: "world";
  onClick: () => void;
  isSelected?: boolean;
  selectedColor?: string | null;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps;
