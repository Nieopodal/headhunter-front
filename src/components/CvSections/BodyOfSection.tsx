import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  additionalClasses?: string;
  color?: string;
}

export const BodyOfSection = ({
  children,
  additionalClasses,
  color,
}: Props) => (
  <div
    className={`${additionalClasses} text-lg p-4 flex`}
    style={color ? { color: color } : {}}
  >
    {children}
  </div>
);
