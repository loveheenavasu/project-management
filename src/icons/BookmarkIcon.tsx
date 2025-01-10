import * as React from "react";

export interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export function BookmarkIcon({
  color = "transparent",
  ...rest
}: BookmarkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bookmark"
      {...rest}
    >
      <path fill={color} d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
    </svg>
  );
}
