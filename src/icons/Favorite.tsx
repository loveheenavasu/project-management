import * as React from "react";

export interface FavoriteIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export function FavoriteIcon({
  color = "currentColor",
  ...rest
}: FavoriteIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-star"
      {...rest}
    >
      <path d="M11.525 2.295a.53.53 0 01.95 0l2.31 4.679a2.123 2.123 0 001.595 1.16l5.166.756a.53.53 0 01.294.904l-3.736 3.638a2.123 2.123 0 00-.611 1.878l.882 5.14a.53.53 0 01-.771.56l-4.618-2.428a2.122 2.122 0 00-1.973 0L6.396 21.01a.53.53 0 01-.77-.56l.881-5.139a2.122 2.122 0 00-.611-1.879L2.16 9.795a.53.53 0 01.294-.906l5.165-.755a2.122 2.122 0 001.597-1.16z" />
    </svg>
  );
}
