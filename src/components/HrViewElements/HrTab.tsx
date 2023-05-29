import React from "react";

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  highlighted: boolean;
  text: string;
}

export const HrTab = ({ onClick, highlighted, text }: Props) => (
  <a
    onClick={onClick}
    className={
      highlighted
        ? "text-white text-lg font-normal max-sm:px-3 px-10 py-4 border-primary border-b-[3px] transition-all duration-400 ease-in-out cursor-pointer caret-transparent"
        : "text-base-content text-lg font-normal max-sm:px-3 px-10 border-base-300 py-4 cursor-pointer border-b-[3px] caret-transparent"
    }
  >
    {text}
  </a>
);
